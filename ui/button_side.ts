/**
 * Button side constants.
 *
 * This file provides constants for button sides.
 * It replaces the Closure Library's ui/buttonside module.
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
 * Constants for button sides.
 */
export enum ButtonSide {
  /** Neither the start nor the end of the button is collapsed. */
  NONE = 0,

  /** The start of the button is collapsed. */
  START = 1,

  /** The end of the button is collapsed. */
  END = 2,

  /** Both the start and end of the button are collapsed. */
  BOTH = 3
}
