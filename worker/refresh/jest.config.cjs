/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

module.exports = async () => {
  return {
    verbose: true,
    reporters: [
        'default',
        ['jest-junit', {outputDirectory: 'reports', outputName: 'report.xml'}],
        'github-actions'
    ],
  }
}