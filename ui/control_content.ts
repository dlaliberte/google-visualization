/**
 * Control content type.
 *
 * This file provides a type for control content.
 * It replaces the Closure Library's ui/controlcontent module.
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

/**
 * Type definition for the content of a control.
 * This can be a string, a DOM node, or an array of DOM nodes.
 */
export type ControlContent = string | Node | Array<Node>;
