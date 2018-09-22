/**
 * The following file is a wrapper for the native {@link Navigator#share} which for some reason isn't included.
 * @license
 *
 * MIT License
 *
 * Copyright (c) 2018 Edric Chan All rights reserved.
 *
 * Use of this source code is protected by a MIT-style license that can be found on the LICENSE
 * file available at the root of this repository.
 */

/**
 * Parameters for {@link Navigator#share}
 */
interface NavigatorShareParams {
  /**
   * The title to share
   */
  title?: string;
  /**
   * The text to share
   */
  text?: string;
  /**
   * The url to share
   */
  url?: string;
}
interface Navigator {
  share(opts: NavigatorShareParams): Promise<void>;
}
