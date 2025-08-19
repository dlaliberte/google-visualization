/**
 * @fileoverview An html table visualization.
 *
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as googArray from '../common/array';
import {assert} from '../common/assert';
import {assertIsElement} from '../common/assert';
import {dispose} from '../common/disposable';
import {
  add,
  addAll,
  contains,
  remove,
  removeAll,
  set,
} from '@npm//@closure/dom/classlist';
import {
  DomHelper,
  removeChildren,
} from '../common/closure-dom';
import {TagName} from '@npm//@closure/dom/tagname';
import {BrowserEvent} from '@npm//@closure/events/browserevent';
import {EventHandler} from '@npm//@closure/events/eventhandler';
import {EventType} from '@npm//@closure/events/eventtype';
import {KeyCodes} from '@npm//@closure/events/keycodes';
import {
  clone,
  forEach,
} from '../common/closure-object';
import {
  isEmptyOrWhitespace,
  isNumeric,
  makeSafe,
  trim,
} from '../common/closure-string';
import * as style from '../common/style';
import {ButtonSide} from '@npm//@closure/ui/buttonside';
import {Component} from '@npm//@closure/ui/component';
import {ControlContent} from '@npm//@closure/ui/controlcontent';
import {CustomButton} from '@npm//@closure/ui/custombutton';
import {
  GECKO,
  IE,
  MAC,
  VERSION,
} from '@npm//@closure/useragent/useragent';
import {safeElement} from '@npm//@safevalues/dom';

import {AnyCallbackWrapper} from '../../common/async_helper';
import {Options, UserOptions} from '../../common/options';
import {Selection} from '../../common/selection';
import {AbstractDataTable} from '../../data/abstract_datatable';
import {DataView} from '../../data/dataview';
import {getDomHelper} from '../../dom/dom';
import * as events from '../../events/events';
import {NumberFormat} from '../../format/numberformat';
import {DynamicLoading as VisCommon} from '../../loader/dynamic_loading';
import {AbstractVisualization} from '../../visualization/abstract_visualization';

import {PageManager, SortInfo} from './page_manager';
import {TableRow} from './table_row';

const {getSafeHtml, getSafeStyle} = VisCommon;
const {trigger} = events;

const {A, DIV, SPAN, TABLE, TBODY, TD, TH, THEAD, TR} = TagName;
const {CLICK, KEYPRESS, MOUSEDOWN, MOUSEOUT, MOUSEOVER, SCROLL} = EventType;

// tslint:disable:ban-types  Migration
// tslint:disable:ban-ts-suppressions

/**
 * Constructs a new table. The table is rendered by the draw method.
 * Expected data format:
 *   Anything goes
 * Supported options:
 *   allowHtml {boolean} If true, allows HTML in the displayed value
 *       (default=false).
 *   allowHtmlSafely {boolean} (default=false, undocumented)
 *   sanitizeHtml {boolean} If used together with allowHtml, will sanitize HTML
 *       to prevent script execution before rendering. (default=false).
 *   keepScrollPosition {boolean} Preserve the scroll position between redraws.
 *       (default=false)
 *   scrollTransition {string} Whether to show css transition of frozen
 *       column and row headers when scrolling.  (default=disable, undocumented)
 *   firstRowNumber {number} The row number for the first row in the
 *       table UI (default=1). Shown only if showRowNumber is true.
 *   showRowNumber {boolean} If true, shows the row number (default=false).
 *   sort {string} enable/event/disable (default=enable). 'enable' means that
 *       the sorting will be done by the table visualization,
 *       and that a 'sort' event will be triggered after sorting.
 *       'event' means that when a user clicks on a column header,
 *       a 'sort' event will be fired but no actual sorting will be performed
 *       by the table, assuming that the application that listens on the
 *       'sort' event will do the sorting.
 *       'disable' means that headers are not clickable and users can not sort.
 *   startPage {number} The first table page to display (default=0).
 *   page {string} enable/event/disable (default=disable). 'enable' means
 *       that the pagination will be done by the table visualization,
 *       and that a 'page' event will be triggered after pagination.
 *       'event' means that when a user clicks on a pagination button,
 *       a 'page' event will be fired but no actual pagination will be
 *       performed by the table, assuming that the application that listens on
 *       the 'page' event will do the paging.
 *       'disable' means that no pagination buttons appear and the user cannot
 *       switch pages.
 *   pageSize {number} Relevant only when the page option is 'enable'/'event'.
 *       If positive makes the table show pages with the specified number of
 *       rows at each page.  Number of pages will be computed from the pageSize.
 *       (default=10)
 *   pagingButtons {string} both/prev/next/auto/<number>
 *      Was pagingButtonsConfiguration.  The options are as follows:
 *       both - enable prev and next buttons
 *       prev - only prev button is enabled
 *       next - only next button is enabled
 *       auto - the buttons are enable according to the current page, on the
 *           first page only next, on the last page only prev and otherwise
 *           both are enabled.  (default=auto)
 *       number - the number of paging buttons to show.  Implies auto for the
 *           next and prev buttons.  This explicit number will override computed
 *           number from pageSize.
 *   pagingSymbols {Object} An object with the following properties
 *       {'prev': prevSymbol, 'next': nextSymbol}. The symbols
 *       would show as the paging buttons values.
 *       Only relevant when paging is enabled and when. If allowHtml=true the
 *       symbol can contain html content otherwise it would be treated as text.
 *       If images are provide the buttons enable/disable appearance may vary.
 *       (default=right and left arrow images).
 *   width {string} Width property of generated table (e.g. '100pt'). If
 *       not specified, the browser will set the width automatically. If
 *       numeric value is specified - pixels units would be assumed.
 *   height {string} Height property of generated table (e.g. '50cm'). If
 *       not specified, the browser will set the height automatically If.
 *       numeric value is specified - pixels units would be assumed.
 *   sortColumn {number} Specifies a column (index) in the data by which the
 *       data should be sorted. The column would also be marked with a small
 *       arrow indicating its sort order, next to the column's header. The
 *       column numbers are zero based {0, 1, ...}.
 *   sortAscending {boolean} (default=true) The order in which the sort column
 *       is sorted. True for ascending, false for descending.
 *   scrollLeftStartPosition {number} If a scroll bar is showing sets its
 *       scroll left start position (default=0).
 *   alternatingRowStyle {boolean} (default=true) Determines if alternating
 *       style will be assigned to odd and even rows.
 *   frozenColumns {number} The number of frozen columns (default=-1).
 *       -1 : no frozen columns
 *        0 : only row numbers (if exist)
 *        x : (0 < x < num cols) x frozen columns along with row number column
 *            if one exists.
 *        Frozen columns will appear only if the table is added with a
 *        horizontal scroll bar.
 *   frozenColumnsBackground {string} The background color of the frozen
 *       columns (default='#fafafa').
 *       TODO(dlaliberte): not supported.
 *   rtlTable {boolean} Show the table in right-to-left directionality
 *       only works for the simple html table case - no scrollPane nor paging
 *       (default=false).
 *       TODO(dlaliberte): remove limitations for rtl table.
 *   cssClassNames {Object} A map of css class names to use for styling the
 *       table, e.g., {'headerRow': 'my-header-row-class-name'}.
 *       For specific styling use row and cell custom properties.
 *       Supported table elements:
 *         headerRow - css class name for the table header row ('tr').
 *         tableRow - css class name for a table row ('tr').
 *         oddTableRow - css class name for an odd table header row ('tr').
 *             Applicable only if alternatingRowStyle is true ('tr').
 *         selectedTableRow - css class name for a selected table row ('tr').
 *         hoverTableRow - css class name for a hovered table row ('tr').
 *         headerCell - css class name for a header row cell ('td').
 *         tableCell - css class name for a table cell ('td').
 *         rowNumberCell - css class name for a row number cell.
 *             Only applicable if showRowNumber is true ('td').
 *   useHeaderClickCapture {boolean} Whether to register the sort handler in
 *       the capture phase (if true) or the bubble phase (if false).
 * Supported (dataTable) custom properties:
 *    Row:
 *      rowColor {string} A color for the row. Note: will affect the row even
 *           when it is clicked or mouse hovered.
 *    Cell:
 *      className {string} A name of a css class to assign to the specified
 *          table cell. The class replaces any other default class otherwise
 *          assigned to the cell.
 *      style {string} A style string to assign to the specified table
 *          cell. Requires the allowHtml option set to true.
 * Events:
 *     select - Thrown when a table row is (un)selected.
 *         Event parameters are {}.
 *     ready - Thrown when the chart has finished rendering.
 *         Event parameters are null.
 *     page - Thrown when a next/prev button is clicked.
 *         Event parameters are {'page': number}.
 *     sort - Thrown when a table column header is clicked.
 *         Event parameters are {'column': number, 'ascending': boolean,
 *            'sortedIndexes': Array<number> }
 * @unrestricted
 */
export class Table extends AbstractVisualization {
  /**
   * A flag to indicate that this table instance is rendering for the first
   * time.
   * @see Table.prototype.waitForCss
   */
  private firstTimeRendered = true;

  /** A div on which we check if the table css file was loaded. */
  private checkCssLoadedDiv: Element | null = null;

  /**
   * Arrays of CSS class names used in the table visualization.
   * If names are specified by the user in options['cssClassNames'], these names
   * are used otherwise the names are taken from
   * CSS_DEFAULT.
   *
   * Note: The names are set in setCustomClassNames after each call to draw()
   * with the passed options.
   */
  private cssClassNames: {[key: string]: string[]} | null = null;

  /**
   * The last selected TableRow (using mouse clicks), by default it is the
   * first row in the current page.
   * @see gviz.PageInfo.getPageRow_.
   */
  private lastSelectedTableRow: TableRow | null = null;

  /** The current data table. */
  private data: AbstractDataTable | null = null;

  /** The current data view, used to maintain row order between sorts. */
  private dataView: DataView | null = null;

  /** The current drawing options. */
  private options: Options | null = null;

  /** The page manager for this table.  Initialized by drawInternal */
  private pageManager!: PageManager;

  /** An array of all the tableRows in the current page. */
  private page: TableRow[] | null = null;

  /**
   * The number of frozen columns. A number x: 0 <= x < number of columns.
   * -1 means no frozen columns.
   */
  private numFrozenColumns: number = -1;

  /** A flag indicating if the data has rows. */
  private hasRows = false;

  /** The paging prev button. Null if paging is disabled. */
  private prevButton: CustomButton | null = null;

  /** The paging next button. Null if paging is disabled. */
  private nextButton: CustomButton | null = null;

  /** The scroll pane left start position */
  private scrollLeftStartPosition = 0;

  /**
   * An event handler using which events are registered and later on cleared.
   */
  private eventHandler: EventHandler | null = null;

  // Table Option Memoizations:
  // These mirror there setting names above and inherit their documentation.

  allowHtml = false;
  allowHtmlSafely = false;
  sanitizeHtml = false;
  showRowNumber = false;
  sort = 'enable';
  useHeaderClickCapture = true;

  // TODO(dlaliberte) Frozen columns - Change default to 0 if bugs are fixed

  /** A dom helper for rendering the html. */
  private readonly dom: DomHelper;

  /**
   * A set of the selected rows. The key is the selected row index, and
   * the value is just set to 1.
   */
  private readonly selectedRows: Selection;

  /** A cache of elements, reused if possible when redrawing. */
  private elementCache: {[key: string]: Element} = {};

  /** The Scroll Pane DIV, containing the table. */
  private scrollPane: Element | null = null;

  /** The Scroll Table, in the scrollPane. */
  private scrollTable: Element | null = null;

  /** The header TR */
  private headerRow: Element | null = null;

  /** The timeout for scrolling. */
  private scrollingTimeout: number | null = null;

  /** The list of THs in the frozen header row. */
  private frozenRowTHs: Element[] | null = null;

  /** The list of TDs in the frozen columns. */
  private frozenColumnTDs: Element[] | null = null;

  /** The frozen table. */
  private frozenTable: Element | null = null;

  /** The frozen header. */
  private frozenHeader: Element | null = null;

  /** The frozen header TR. */
  private frozenHeaderRow: Element | null = null;

  /** The frozen header THs. */
  private frozenHeaderTHs: Element[] | null = null;

  /** The frozen column TDs. */
  private frozenColumnTDsArray: Element[][] | null = null;

  /** The frozen column TRs. */
  private frozenColumnTRs: Element[] | null = null;

  /** The frozen column table. */
  private frozenColumnTable: Element | null = null;

  /** The frozen column header. */
  private frozenColumnHeader: Element | null = null;

  /** The frozen column header TR. */
  private frozenColumnHeaderRow: Element | null = null;

  /** The frozen column header THs. */
  private frozenColumnHeaderTHs: Element[] | null = null;

  /** The frozen column body. */
  private frozenColumnBody: Element | null = null;

  /** The frozen column body TRs. */
  private frozenColumnBodyTRs: Element[] | null = null;

  /** The frozen column body TDs. */
  private frozenColumnBodyTDs: Element[][] | null = null;

  /** The frozen column body table. */
  private frozenColumnBodyTable: Element | null = null;

  /** The frozen column body header. */
  private frozenColumnBodyHeader: Element | null = null;

  /** The frozen column body header TR. */
  private frozenColumnBodyHeaderRow: Element | null = null;

  /** The frozen column body header THs. */
  private frozenColumnBodyHeaderTHs: Element[] | null = null;

  /** The frozen column body body. */
  private frozenColumnBodyBody: Element | null = null;

  /** The frozen column body body TRs. */
  private frozenColumnBodyBodyTRs: Element[] | null = null;

  /** The frozen column body body TDs. */
  private frozenColumnBodyBodyTDs: Element[][] | null = null;

  /** The frozen column body body table. */
  private frozenColumnBodyBodyTable: Element | null = null;

  /** The frozen column body body header. */
  private frozenColumnBodyBodyHeader: Element | null = null;

  /** The frozen column body body header TR. */
  private frozenColumnBodyBodyHeaderRow: Element | null = null;

  /** The frozen column body body header THs. */
  private frozenColumnBodyBodyHeaderTHs: Element[] | null = null;

  /** The frozen column body body body. */
  private frozenColumnBodyBodyBody: Element | null = null;

  /** The frozen column body body body TRs. */
  private frozenColumnBodyBodyBodyTRs: Element[] | null = null;

  /** The frozen column body body body TDs. */
  private frozenColumnBodyBodyBodyTDs: Element[][] | null = null;

  /**
   * @param container The HTML element into which the table is to be rendered.
   */
  constructor(container: Element) {
    super(container);

    this.dom = getDomHelper();
    this.selectedRows = new Selection();
  }

  /**
   * Draws the table.
   * @param data The data table.
   * @param options The drawing options.
   */
  override draw(data: AbstractDataTable, options?: UserOptions) {
    this.drawInternal(data, options);
  }

  /**
   * Draws the table.
   * @param data The data table.
   * @param options The drawing options.
   */
  private drawInternal(data: AbstractDataTable, options?: UserOptions) {
    // Clear the chart.
    this.clearChart();

    // Store the data and options.
    this.data = data;
    this.options = new Options([
      {
        'allowHtml': false,
        'allowHtmlSafely': false,
        'sanitizeHtml': false,
        'keepScrollPosition': false,
        'scrollTransition': 'disable',
        'firstRowNumber': 1,
        'showRowNumber': false,
        'sort': 'enable',
        'startPage': 0,
        'page': 'disable',
        'pageSize': 10,
        'pagingButtons': 'auto',
        'pagingSymbols': {'prev': '❮', 'next': '❯'},
        'width': undefined,
        'height': undefined,
        'sortColumn': -1,
        'sortAscending': true,
        'scrollLeftStartPosition': 0,
        'alternatingRowStyle': true,
        'frozenColumns': -1,
        'frozenColumnsBackground': '#fafafa',
        'rtlTable': false,
        'cssClassNames': {},
        'useHeaderClickCapture': true,
      },
      options || {},
    ]);

    // Memoize some options for performance.
    this.allowHtml = this.options.inferBooleanValue('allowHtml');
    this.allowHtmlSafely = this.options.inferBooleanValue('allowHtmlSafely');
    this.sanitizeHtml = this.options.inferBooleanValue('sanitizeHtml');
    this.showRowNumber = this.options.inferBooleanValue('showRowNumber');
    this.sort = this.options.inferStringValue('sort');
    this.useHeaderClickCapture = this.options.inferBooleanValue('useHeaderClickCapture');

    // Create the page manager.
    this.pageManager = new PageManager(data, this.options);

    // Check if the data has rows.
    this.hasRows = data.getNumberOfRows() > 0;

    // Set the number of frozen columns.
    this.numFrozenColumns = this.options.inferNumberValue('frozenColumns');
    if (this.numFrozenColumns >= data.getNumberOfColumns()) {
      this.numFrozenColumns = data.getNumberOfColumns() - 1;
    }

    // Set the scroll left start position.
    this.scrollLeftStartPosition = this.options.inferNumberValue('scrollLeftStartPosition');

    // Create the data view.
    this.dataView = new DataView(data);

    // Sort the data if needed.
    const sortColumn = this.options.inferNumberValue('sortColumn');
    if (sortColumn >= 0 && sortColumn < data.getNumberOfColumns()) {
      const sortAscending = this.options.inferBooleanValue('sortAscending');
      this.dataView.sort([{column: sortColumn, desc: !sortAscending}]);
    }

    // Set the page.
    const startPage = this.options.inferNumberValue('startPage');
    this.pageManager.setCurrentPage(startPage);

    // Get the current page.
    this.page = this.pageManager.getCurrentPage(this.dataView);

    // Set the custom class names.
    this.setCustomClassNames();

    // Wait for CSS to load, then render.
    this.waitForCss(() => {
      this.redraw();
      trigger(this, 'ready', null);
    });
  }

  /**
   * Sets the custom class names based on the options.
   */
  private setCustomClassNames() {
    this.cssClassNames = clone(CSS_DEFAULT);
    const customClassNames = this.options!.inferObjectValue('cssClassNames');
    if (customClassNames) {
      forEach(CLASSNAME_TO_OPTION_NAME, (optionName, className) => {
        if (customClassNames[optionName]) {
          this.cssClassNames![className] = [customClassNames[optionName]];
        }
      });
    }
  }

  /**
   * Waits for the CSS file to be loaded, then calls the callback.
   * @param callback The callback to call when the CSS is loaded.
   */
  private waitForCss(callback: AnyCallbackWrapper) {
    if (!this.firstTimeRendered) {
      callback();
      return;
    }

    // Create a div to check if the CSS is loaded.
    if (!this.checkCssLoadedDiv) {
      this.checkCssLoadedDiv = this.dom.createDom(DIV, {
        'class': CSS_DEFAULT.TABLE.join(' '),
        'style': 'position:absolute;left:-1000px;top:-1000px;width:1px;height:1px;',
      });
      this.dom.appendChild(this.dom.getDocument().body, this.checkCssLoadedDiv);
    }

    // Check if the CSS is loaded.
    let iterations = 0;
    const checkCss = () => {
      iterations++;
      if (iterations > WAIT_FOR_CSS_MAX_ITERATIONS) {
        // Give up waiting for CSS.
        callback();
        return;
      }

      const computedStyle = style.getComputedStyle(this.checkCssLoadedDiv!, 'border-top-width');
      if (computedStyle && computedStyle !== '0px') {
        // CSS is loaded.
        this.firstTimeRendered = false;
        callback();
      } else {
        // CSS is not loaded yet, wait a bit more.
        setTimeout(checkCss, CSS_WAIT_INCREMENT);
      }
    };

    checkCss();
  }

  /**
   * Redraws the table.
   */
  private redraw() {
    // Store the scroll position if needed.
    if (this.options!.inferBooleanValue('keepScrollPosition')) {
      this.storeScrollPosition();
    }

    // Clear the drawing elements.
    this.clear();

    // Create the event handler.
    this.eventHandler = new EventHandler();

    // Create the content div.
    const contentDiv = this.getOrCreateElement(ElementName.CONTENT, () => {
      return this.dom.createDom(DIV, {'class': 'google-visualization-table-div-content'});
    });
    this.dom.appendChild(this.container, contentDiv);

    // Create the table.
    this.createTable(contentDiv);

    // Create the paging controls if needed.
    if (this.options!.inferStringValue('page') !== 'disable') {
      this.createPagingControls(contentDiv);
    }

    // Create the clear float div.
    const clearFloatDiv = this.getOrCreateElement(ElementName.CLEAR_FLOAT, () => {
      return this.dom.createDom(DIV, {'style': 'clear:both;'});
    });
    this.dom.appendChild(contentDiv, clearFloatDiv);

    // Set the dimensions.
    this.setDimensions();

    // Restore the scroll position if needed.
    if (this.options!.inferBooleanValue('keepScrollPosition')) {
      this.restoreScrollPosition();
    }
  }

  /**
   * Gets or creates an element from the cache.
   * @param name The name of the element.
   * @param creator A function that creates the element if it doesn't exist.
   * @return The element.
   */
  private getOrCreateElement(name: string, creator: () => Element): Element {
    if (!this.elementCache[name]) {
      this.elementCache[name] = creator();
    }
    return this.elementCache[name];
  }

  /**
   * Creates the table.
   * @param container The container element.
   */
  private createTable(container: Element) {
    // Determine if we need a scroll pane.
    const needsScrollPane = this.needsScrollPane();

    if (needsScrollPane) {
      this.createScrollableTable(container);
    } else {
      this.createSimpleTable(container);
    }
  }

  /**
   * Determines if the table needs a scroll pane.
   * @return True if the table needs a scroll pane.
   */
  private needsScrollPane(): boolean {
    const width = this.options!.inferStringValue('width');
    const height = this.options!.inferStringValue('height');
    return !!(width || height || this.numFrozenColumns >= 0);
  }

  /**
   * Creates a simple table without scrolling.
   * @param container The container element.
   */
  private createSimpleTable(container: Element) {
    const table = this.dom.createDom(TABLE, {
      'class': this.cssClassNames!.TABLE.join(' '),
      'cellspacing': '0',
      'cellpadding': '0',
    });

    // Create the header.
    this.createTableHeader(table);

    // Create the body.
    this.createTableBody(table);

    this.dom.appendChild(container, table);
  }

  /**
   * Creates a scrollable table.
   * @param container The container element.
   */
  private createScrollableTable(container: Element) {
    // Create the scroll pane.
    this.scrollPane = this.getOrCreateElement(ElementName.SCROLL_PANE, () => {
      return this.dom.createDom(DIV, {
        'class': 'google-visualization-table-div-scrollpane',
        'style': 'overflow:auto;',
      });
    });
    this.dom.appendChild(container, this.scrollPane);

    // Create the scroll table.
    this.scrollTable = this.dom.createDom(TABLE, {
      'class': this.cssClassNames!.TABLE.join(' '),
      'cellspacing': '0',
      'cellpadding': '0',
    });

    // Create the header.
    this.createTableHeader(this.scrollTable);

    // Create the body.
    this.createTableBody(this.scrollTable);

    this.dom.appendChild(this.scrollPane, this.scrollTable);

    // Create frozen columns if needed.
    if (this.numFrozenColumns >= 0) {
      this.createFrozenColumns(container);
    }

    // Register scroll event.
    this.eventHandler!.listen(this.scrollPane, SCROLL, (e: BrowserEvent) => {
      this.handleScroll(e);
    });
  }

  /**
   * Creates the table header.
   * @param table The table element.
   */
  private createTableHeader(table: Element) {
    const thead = this.dom.createDom(THEAD);
    this.headerRow = this.dom.createDom(TR, {
      'class': this.cssClassNames!.TR_HEAD.join(' '),
    });

    // Add row number header if needed.
    if (this.showRowNumber) {
      const th = this.dom.createDom(TH, {
        'class': this.cssClassNames!.SEQ.join(' '),
      });
      this.dom.appendChild(this.headerRow, th);
    }

    // Add column headers.
    const data = this.data!;
    for (let c = 0; c < data.getNumberOfColumns(); c++) {
      const th = this.dom.createDom(TH, {
        'class': this.cssClassNames!.TH.join(' '),
      });

      // Set the column header text.
      const columnLabel = data.getColumnLabel(c) || data.getColumnId(c);
      if (this.allowHtml || this.allowHtmlSafely) {
        if (this.sanitizeHtml) {
          th.innerHTML = getSafeHtml(columnLabel).toString();
        } else {
          th.innerHTML = columnLabel;
        }
      } else {
        this.dom.setTextContent(th, columnLabel);
      }

      // Add sort indicator if this column is sorted.
      const sortColumn = this.options!.inferNumberValue('sortColumn');
      if (sortColumn === c) {
        const sortAscending = this.options!.inferBooleanValue('sortAscending');
        const sortIndicator = this.dom.createDom(SPAN, {
          'class': this.cssClassNames!.SORTIND.join(' '),
        });
        this.dom.setTextContent(sortIndicator, sortAscending ? '▲' : '▼');
        this.dom.appendChild(th, sortIndicator);
      }

      // Add sort class if sorting is enabled.
      if (this.sort !== 'disable') {
        add(th, this.cssClassNames!.SORT.join(' '));
        th.setAttribute('tabindex', '0');

        // Register click event.
        this.eventHandler!.listen(th, CLICK, (e: BrowserEvent) => {
          this.handleHeaderClick(c);
        }, this.useHeaderClickCapture);

        // Register keypress event.
        this.eventHandler!.listen(th, KEYPRESS, (e: BrowserEvent) => {
          this.handleHeaderKeypress(c, e);
        });
      }

      this.dom.appendChild(this.headerRow, th);
    }

    this.dom.appendChild(thead, this.headerRow);
    this.dom.appendChild(table, thead);
  }

  /**
   * Creates the table body.
   * @param table The table element.
   */
  private createTableBody(table: Element) {
    const tbody = this.dom.createDom(TBODY);

    if (this.hasRows && this.page) {
      const data = this.data!;
      const cellCssClassNames = Table.getCellCssClassNames(data, this.cssClassNames!);
      const alternatingRowStyle = this.options!.inferBooleanValue('alternatingRowStyle');

      for (let r = 0; r < this.page.length; r++) {
        const tableRow = this.page[r];
        const dataRowIndex = tableRow.getDataRowIndex();
        const tr = this.dom.createDom(TR);

        // Set row classes.
        const rowClasses = [this.cssClassNames!.TR_EVEN[0]];
        if (alternatingRowStyle && r % 2 === 1) {
          rowClasses.push(this.cssClassNames!.TR_ODD[0]);
        }
        if (this.selectedRows.has(dataRowIndex)) {
          rowClasses.push(this.cssClassNames!.TR_SELECTED[0]);
        }
        set(tr, rowClasses);

        // Set row color if specified.
        const rowColor = data.getRowProperty(dataRowIndex, 'rowColor');
        if (rowColor) {
          tr.style.backgroundColor = rowColor;
        }

        // Add row number cell if needed.
        if (this.showRowNumber) {
          const td = this.dom.createDom(TD, {
            'class': this.cssClassNames!.SEQ.join(' '),
          });
          const rowNumber = this.options!.inferNumberValue('firstRowNumber') + r;
          this.dom.setTextContent(td, String(rowNumber));
          this.dom.appendChild(tr, td);
        }

        // Add data cells.
        for (let c = 0; c < data.getNumberOfColumns(); c++) {
          const td = this.dom.createDom(TD);

          // Set cell classes.
          const cellClasses = [this.cssClassNames!.TD[0]];
          cellClasses.push(...cellCssClassNames[c]);

          // Add custom class name if specified.
          const customClassName = data.getProperty(dataRowIndex, c, 'className');
          if (customClassName) {
            cellClasses.push(customClassName);
          }

          set(td, cellClasses);

          // Set cell style if specified.
          const customStyle = data.getProperty(dataRowIndex, c, 'style');
          if (customStyle && (this.allowHtml || this.allowHtmlSafely)) {
            td.setAttribute('style', customStyle);
          }

          // Set cell content.
          const formattedValue = data.getFormattedValue(dataRowIndex, c);
          if (this.allowHtml || this.allowHtmlSafely) {
            if (this.sanitizeHtml) {
              td.innerHTML = getSafeHtml(formattedValue).toString();
            } else {
              td.innerHTML = formattedValue;
            }
          } else {
            this.dom.setTextContent(td, formattedValue);
          }

          this.dom.appendChild(tr, td);
        }

        // Register row events.
        this.eventHandler!.listen(tr, CLICK, (e: BrowserEvent) => {
          this.handleRowClick(tableRow, e);
        });

        this.eventHandler!.listen(tr, MOUSEOVER, (e: BrowserEvent) => {
          this.handleRowMouseOver(tr);
        });

        this.eventHandler!.listen(tr, MOUSEOUT, (e: BrowserEvent) => {
          this.handleRowMouseOut(tr);
        });

        this.dom.appendChild(tbody, tr);
      }
    }

    this.dom.appendChild(table, tbody);
  }

  /**
   * Creates frozen columns.
   * @param container The container element.
   */
  private createFrozenColumns(container: Element) {
    // TODO: Implement frozen columns functionality
    // This is a complex feature that requires careful positioning and synchronization
    // For now, we'll leave this as a placeholder
  }

  /**
   * Creates the paging controls.
   * @param container The container element.
   */
  private createPagingControls(container: Element) {
    const pagingDiv = this.getOrCreateElement(ElementName.PAGING_CONTROLS, () => {
      return this.dom.createDom(DIV, {
        'class': this.cssClassNames!.PAGE_DIV.join(' '),
      });
    });

    // Create previous button.
    const pagingSymbols = this.options!.inferObjectValue('pagingSymbols') || {};
    const prevSymbol = pagingSymbols['prev'] || '❮';
    this.prevButton = new CustomButton(prevSymbol);
    this.prevButton.addClassName(this.cssClassNames!.PAGE_PREV[0]);
    this.prevButton.render(pagingDiv);

    // Create page numbers.
    const pageNumbersDiv = this.dom.createDom(DIV, {
      'class': this.cssClassNames!.PAGE_NUMBERS.join(' '),
    });

    const currentPage = this.pageManager.getCurrentPageIndex();
    const totalPages = this.pageManager.getNumberOfPages();
    const pagingButtons = this.options!.inferStringValue('pagingButtons');

    if (pagingButtons === 'auto' || isNumeric(pagingButtons)) {
      const maxButtons = isNumeric(pagingButtons) ? Number(pagingButtons) : 5;
      const startPage = Math.max(0, currentPage - Math.floor(maxButtons / 2));
      const endPage = Math.min(totalPages - 1, startPage + maxButtons - 1);

      for (let p = startPage; p <= endPage; p++) {
        const pageButton = this.dom.createDom(SPAN, {
          'class': this.cssClassNames!.PAGE_NUMBER.join(' '),
        });
        this.dom.setTextContent(pageButton, String(p + 1));

        if (p === currentPage) {
          add(pageButton, 'google-visualization-table-page-current');
        }

        this.eventHandler!.listen(pageButton, CLICK, (e: BrowserEvent) => {
          this.handlePageClick(p);
        });

        this.dom.appendChild(pageNumbersDiv, pageButton);
      }
    }

    this.dom.appendChild(pagingDiv, pageNumbersDiv);

    // Create next button.
    const nextSymbol = pagingSymbols['next'] || '❯';
    this.nextButton = new CustomButton(nextSymbol);
    this.nextButton.addClassName(this.cssClassNames!.PAGE_NEXT[0]);
    this.nextButton.render(pagingDiv);

    // Update button states.
    this.updatePagingButtons();

    // Register button events.
    this.eventHandler!.listen(this.prevButton.getElement(), CLICK, (e: BrowserEvent) => {
      this.handlePrevClick();
    });

    this.eventHandler!.listen(this.nextButton.getElement(), CLICK, (e: BrowserEvent) => {
      this.handleNextClick();
    });

    this.dom.appendChild(container, pagingDiv);
  }

  /**
   * Updates the state of the paging buttons.
   */
  private updatePagingButtons() {
    if (!this.prevButton || !this.nextButton) {
      return;
    }

    const currentPage = this.pageManager.getCurrentPageIndex();
    const totalPages = this.pageManager.getNumberOfPages();
    const pagingButtons = this.options!.inferStringValue('pagingButtons');

    // Update previous button.
    const showPrev = pagingButtons === 'both' || pagingButtons === 'prev' ||
                     (pagingButtons === 'auto' && currentPage > 0);
    this.prevButton.setEnabled(showPrev && currentPage > 0);
    this.prevButton.setVisible(showPrev);

    // Update next button.
    const showNext = pagingButtons === 'both' || pagingButtons === 'next' ||
                     (pagingButtons === 'auto' && currentPage < totalPages - 1);
    this.nextButton.setEnabled(showNext && currentPage < totalPages - 1);
    this.nextButton.setVisible(showNext);
  }

  /**
   * Sets the dimensions of the table.
   */
  private setDimensions() {
    const width = this.options!.inferStringValue('width');
    const height = this.options!.inferStringValue('height');

    if (this.scrollPane) {
      if (width) {
        this.scrollPane.style.width = Table.addUnitsIfRequired(width);
      }
      if (height) {
        this.scrollPane.style.height = Table.addUnitsIfRequired(height);
      }
    }
  }

  /**
   * Restores the scroll position.
   */
  private restoreScrollPosition() {
    if (this.scrollPane && this.scrollLeftStartPosition > 0) {
      this.scrollPane.scrollLeft = this.scrollLeftStartPosition;
    }
  }

  /**
   * Handles a row click event.
   * @param tableRow The clicked table row.
   * @param event The browser event.
   */
  private handleRowClick(tableRow: TableRow, event: BrowserEvent) {
    const dataRowIndex = tableRow.getDataRowIndex();

    if (this.selectedRows.has(dataRowIndex)) {
      this.selectedRows.remove(dataRowIndex);
    } else {
      this.selectedRows.add(dataRowIndex);
    }

    this.lastSelectedTableRow = tableRow;
    this.updateRowSelection();
    trigger(this, 'select', {});
  }

  /**
   * Handles a row mouse over event.
   * @param tr The table row element.
   */
  private handleRowMouseOver(tr: Element) {
    add(tr, this.cssClassNames!.TR_MOUSEOVER[0]);
  }

  /**
   * Handles a row mouse out event.
   * @param tr The table row element.
   */
  private handleRowMouseOut(tr: Element) {
    remove(tr, this.cssClassNames!.TR_MOUSEOVER[0]);
  }

  /**
   * Updates the visual selection of rows.
   */
  private updateRowSelection() {
    // This would need to update the visual appearance of selected rows
    // For now, we'll trigger a redraw to update the selection
    this.redraw();
  }

  /**
   * Handles a page click event.
   * @param pageIndex The clicked page index.
   */
  private handlePageClick(pageIndex: number) {
    if (this.options!.inferStringValue('page') === 'event') {
      trigger(this, 'page', {'page': pageIndex});
    } else {
      this.pageManager.setCurrentPage(pageIndex);
      this.page = this.pageManager.getCurrentPage(this.dataView!);
      this.redraw();
      trigger(this, 'page', {'page': pageIndex});
    }
  }

  /**
   * Handles a previous page click event.
   */
  private handlePrevClick() {
    const currentPage = this.pageManager.getCurrentPageIndex();
    if (currentPage > 0) {
      this.handlePageClick(currentPage - 1);
    }
  }

  /**
   * Handles a next page click event.
   */
  private handleNextClick() {
    const currentPage = this.pageManager.getCurrentPageIndex();
    const totalPages = this.pageManager.getNumberOfPages();
    if (currentPage < totalPages - 1) {
      this.handlePageClick(currentPage + 1);
    }
  }

  /**
   * Handles a scroll event.
   * @param event The browser event.
   */
  private handleScroll(event: BrowserEvent) {
    // Handle frozen column synchronization
    if (this.numFrozenColumns >= 0) {
      // TODO: Implement frozen column scroll synchronization
    }

    // Clear any existing timeout.
    if (this.scrollingTimeout) {
      clearTimeout(this.scrollingTimeout);
    }

    // Set a new timeout to handle scroll end.
    this.scrollingTimeout = setTimeout(() => {
      this.scrollingTimeout = null;
      // Handle scroll end if needed
    }, 100);
  }

  /**
   * Handles a column header click event for sorting.
   * @param colInd The index of the clicked column.
   */
  private handleHeaderClick(colInd: number) {
    if (this.sort === 'disable') {
      return;
    }

    const currentSortColumn = this.options!.inferNumberValue('sortColumn');
    let sortAscending = true;

    if (currentSortColumn === colInd) {
      // Toggle sort order for the same column.
      sortAscending = !this.options!.inferBooleanValue('sortAscending');
    }

    if (this.sort === 'enable') {
      // Perform the sort.
      this.dataView!.sort([{column: colInd, desc: !sortAscending}]);
      this.options!.setValue('sortColumn', colInd);
      this.options!.setValue('sortAscending', sortAscending);

      // Update the page.
      this.page = this.pageManager.getCurrentPage(this.dataView!);
      this.redraw();

      // Trigger sort event.
      trigger(this, 'sort', {
        'column': colInd,
        'ascending': sortAscending,
        'sortedIndexes': this.dataView!.getViewRowIndices(),
      });
    } else if (this.sort === 'event') {
      // Just trigger the sort event.
      trigger(this, 'sort', {
        'column': colInd,
        'ascending': sortAscending,
        'sortedIndexes': null,
      });
    }
  }

  /**
   * Handles a keypress event on a column header for sorting.
   * @param colInd The index of the clicked column.
   * @param event Browser's event object.
   */
  private handleHeaderKeypress(colInd: number, event: BrowserEvent) {
    if (event.keyCode === KeyCodes.ENTER) {
      this.handleHeaderClick(colInd);
    }
  }

  /**
   * Stores the scrolling start position based on the current scroll pane.
   * Used before redraw is called .
   */
  private storeScrollPosition() {
    if (this.scrollPane) {
      this.scrollLeftStartPosition = this.scrollPane.scrollLeft;
    }
  }

  /**
   * Clears the drawing elements.
   * Remove any resources allocated by the redraw() method.
   */
  private clear() {
    // Dispose of the event handlers.
    dispose(this.eventHandler);
    this.eventHandler = null;

    // Clear the DOM elements.
    this.dom.removeChildren(this.container);

    // Dispose of the button objects.
    dispose(this.prevButton);
    this.prevButton = null;
    dispose(this.nextButton);
    this.nextButton = null;

    this.elementCache = {};
  }

  /**
   * Clears the chart.
   * Remove any resources allocated for this chart.
   */
  override clearChart() {
    // Clear resources allocated by the redraw() method.
    this.clear();

    // Clear the selection object.
    this.selectedRows.clear();

    // Clear the page manager.
    // Will be reset by drawInternal.
    // this.pageManager = null;
  }

  /**
   * Returns the given string with 'px' appended if it is numeric.
   * @param dimension The dimension string.
   * @return A qualified dimension string.
   */
  private static addUnitsIfRequired(dimension: string): string {
    if (isEmptyOrWhitespace(makeSafe(dimension))) {
      return dimension;
    }
    let res = dimension;
    if (isNumeric(dimension) && String(dimension) !== '0') {
      res += 'px';
    }
    return res;
  }

  /**
   * Returns CSS class names for table cells according to the column they are
   * in. These class names should apply to header and body cells.
   *
   * @param data The data.
   * @param cssClassNames The name of the css classes used in the table
   *     visualization.
   *
   * @return The css class names for table cells according to the column they
   *     are in.
   */
  private static getCellCssClassNames(
    data: AbstractDataTable,
    cssClassNames: {[key: string]: string[]},
  ): string[][] {
    return Table.getColumnTypes(data).map((type, c) => {
      // Check column property first:
      let classNames: AnyDuringMigration[] = [];
      const customClassName = data.getColumnProperty(c, 'className');

      // If no column property, use the column type:
      switch (type) {
        case 'boolean':
          /**
           * @suppress {strictMissingProperties} Auto-added to unblock
           * check_level=STRICT
           */
          // Suppressing errors for ts-migration.
          //   TS4111: Property 'CELL_BOOLEAN' comes from an index signature,
          //   so it must be accessed with ['CELL_BOOLEAN'].
          // @ts-ignore
          classNames = cssClassNames.CELL_BOOLEAN;
          break;
        case 'number':
          /**
           * @suppress {strictMissingProperties} Auto-added to unblock
           * check_level=STRICT
           */
          // Suppressing errors for ts-migration.
          //   TS4111: Property 'CELL_NUMBER' comes from an index signature,
          //   so it must be accessed with ['CELL_NUMBER'].
          // @ts-ignore
          classNames = cssClassNames.CELL_NUMBER;
          break;
        case 'date':
        case 'datetime':
        case 'timeofday':
          /**
           * @suppress {strictMissingProperties} Auto-added to unblock
           * check_level=STRICT
           */
          // Suppressing errors for ts-migration.
          //   TS4111: Property 'CELL_DATE' comes from an index signature, so
          //   it must be accessed with ['CELL_DATE'].
          // @ts-ignore
          classNames = cssClassNames.CELL_DATE;
          break;
        default:
          // throw new Error(`Unexpected column type "${type}"`);
          // Not an error?  Just break.
          break;
      }
      if (customClassName && typeof customClassName === 'string') {
        classNames = classNames.concat(trim(customClassName).split(/\s+/));
      }

      return classNames;
    });
  }

  /**
   * Returns the array of column types for the given data.
   *
   * @param data The data.
   *
   * @return An array with the given data column types.
   */
  private static getColumnTypes(data: AbstractDataTable): string[] {
    const colTypes = [];
    for (let c = 0; c < data.getNumberOfColumns(); c++) {
      colTypes.push(data.getColumnType(c));
    }
    return colTypes;
  }

  /**
   * Sets an element to be hidden.
   *
   * @param element The element.
   */
  private static setElementHidden(element: Element) {
    add(element, HIDDEN_CLASS);
    Table.setElementTransparent(element);
  }

  /**
   * Sets an element to be transparent.
   *
   * @param element The element.
   */
  private static setElementTransparent(element: Element) {
    /**
     * @suppress {strictPrimitiveOperators} Auto-added to unblock
     * check_level=STRICT
     */
    add(
      element,
      IE && Number(VERSION) < 7 ? TRANSPARENT_CLASS_IE6 : TRANSPARENT_CLASS,
    );
  }
}

/**
 * The number of timeout iterations to wait for css loading.
 * @see Table.prototype.waitForCss
 */
const WAIT_FOR_CSS_MAX_ITERATIONS = 10;

/**
 * How much to increment the timeout while waiting for css file to be loaded.
 * @see Table.prototype.waitForCss
 */
const CSS_WAIT_INCREMENT = 200;

/** The CSS class name prefix. */
const CSSPREFIX = 'google-visualization-table-';

/** Arrays of default CSS class names for each component of the table. */
const CSS_DEFAULT = {
  TABLE: [`${CSSPREFIX}table`],
  TR_HEAD: [`${CSSPREFIX}tr-head`],
  TR_EVEN: [`${CSSPREFIX}tr-even`],
  TR_ODD: [`${CSSPREFIX}tr-odd`],
  TR_SELECTED: [`${CSSPREFIX}tr-sel`],
  TR_MOUSEOVER: [`${CSSPREFIX}tr-over`],
  TH: [`${CSSPREFIX}th`, 'gradient'],
  TD: [`${CSSPREFIX}td`],
  CELL_NUMBER: [`${CSSPREFIX}type-number`],
  CELL_DATE: [`${CSSPREFIX}type-date`],
  CELL_BOOLEAN: [`${CSSPREFIX}type-bool`],
  SEQ: [`${CSSPREFIX}seq`],
  SORT: [`${CSSPREFIX}sorthdr`],
  SORTIND: [`${CSSPREFIX}sortind`],
  PAGE_DIV: [`${CSSPREFIX}div-page`, 'gradient'],
  PAGE_NUMBERS: [`${CSSPREFIX}page-numbers`],
  PAGE_NUMBER: [`${CSSPREFIX}page-number`, 'gradient'],
  PAGE_PREV: [`${CSSPREFIX}page-prev`],
  PAGE_NEXT: [`${CSSPREFIX}page-next`],
};

/**
 * A map between a css class name and the corresponding attribute of
 * cssClassNames options (both reference the same table element).
 */
const CLASSNAME_TO_OPTION_NAME = {
  TR_HEAD: 'headerRow',
  TR_EVEN: 'tableRow',
  TR_ODD: 'oddTableRow',
  TR_SELECTED: 'selectedTableRow',
  TR_MOUSEOVER: 'hoverTableRow',
  TH: 'headerCell',
  TD: 'tableCell',
  SEQ: 'rowNumberCell',
};

/**
 * The names of various elements in the table display,
 *   used mostly for cache lookup
 */
enum ElementName {
  CONTENT = 'content',
  SCROLL_PANE = 'scroll-pane',
  HEADER = 'header',
  FROZEN_TABLE = 'frozen-table',
  FROZEN_HEADER = 'frozen-header',
  PAGING_CONTROLS = 'paging-controls',
  CLEAR_FLOAT = 'clear-float',
}

/** The class for a transparent element. */
const TRANSPARENT_CLASS = 'transparent';

/**
 * The class for a transparent element in IE6 (borderColor is not set
 * due to an IE6 bug).
 */
const TRANSPARENT_CLASS_IE6 = 'transparentIE6';

/** The class for a hidden element. */
const HIDDEN_CLASS = 'google-visualization-hidden';

// Type definitions for migration
type AnyDuringMigration = any;
