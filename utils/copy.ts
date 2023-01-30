/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export const copyToClipboard = (text: string): any => {
  return navigator.clipboard.writeText(text)
}
