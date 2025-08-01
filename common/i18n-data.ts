/**
 * @fileoverview I18n data to replace goog.i18n patterns and symbols
 * This module provides basic i18n data for date/time formatting.
 */

/**
 * Default date/time patterns for English locale.
 */
export const DateTimePatterns = {
  YEAR_FULL: 'y',
  YEAR_FULL_WITH_ERA: 'y G',
  YEAR_MONTH_ABBR: 'MMM y',
  YEAR_MONTH_FULL: 'MMMM y',
  YEAR_MONTH_SHORT: 'MM/y',
  MONTH_DAY_ABBR: 'MMM d',
  MONTH_DAY_FULL: 'MMMM dd',
  MONTH_DAY_SHORT: 'M/d',
  MONTH_DAY_MEDIUM: 'MMM d',
  MONTH_DAY_YEAR_MEDIUM: 'MMM d, y',
  WEEKDAY_MONTH_DAY_MEDIUM: 'EEE, MMM d',
  WEEKDAY_MONTH_DAY_YEAR_MEDIUM: 'EEE, MMM d, y',
  DAY_ABBR: 'd',
  MONTH_DAY_TIME_ZONE_SHORT: 'MMM d, h:mm a z'
};

/**
 * Default date/time symbols for English locale.
 */
export const DateTimeSymbols = {
  ERAS: ['BC', 'AD'],
  ERANAMES: ['Before Christ', 'Anno Domini'],
  NARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  STANDALONENARROWMONTHS: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  MONTHS: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  STANDALONEMONTHS: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  SHORTMONTHS: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  STANDALONESHORTMONTHS: [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],
  WEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  STANDALONEWEEKDAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  SHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  STANDALONESHORTWEEKDAYS: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  NARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  STANDALONENARROWWEEKDAYS: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  SHORTQUARTERS: ['Q1', 'Q2', 'Q3', 'Q4'],
  QUARTERS: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'],
  AMPMS: ['AM', 'PM'],
  DATEFORMATS: ['EEEE, MMMM d, y', 'MMMM d, y', 'MMM d, y', 'M/d/yy'],
  TIMEFORMATS: ['h:mm:ss a zzzz', 'h:mm:ss a z', 'h:mm:ss a', 'h:mm a'],
  DATETIMEFORMATS: ['{1} \'at\' {0}', '{1} \'at\' {0}', '{1}, {0}', '{1}, {0}'],
  FIRSTDAYOFWEEK: 6,
  WEEKENDRANGE: [5, 6],
  FIRSTWEEKCUTOFFDAY: 2
};

/**
 * Number format symbols for English locale.
 */
export const NumberFormatSymbols = {
  DECIMAL_SEP: '.',
  GROUP_SEP: ',',
  PERCENT: '%',
  ZERO_DIGIT: '0',
  PLUS_SIGN: '+',
  MINUS_SIGN: '-',
  EXP_SYMBOL: 'E',
  PERMILL: '‰',
  INFINITY: '∞',
  NAN: 'NaN',
  DECIMAL_PATTERN: '#,##0.###',
  SCIENTIFIC_PATTERN: '#E0',
  PERCENT_PATTERN: '#,##0%',
  CURRENCY_PATTERN: '¤#,##0.00',
  DEF_CURRENCY_CODE: 'USD'
};

/**
 * Locale information.
 */
export const LocaleInfo = {
  LOCALE: 'en',
  LANGUAGE: 'en',
  COUNTRY: 'US'
};
