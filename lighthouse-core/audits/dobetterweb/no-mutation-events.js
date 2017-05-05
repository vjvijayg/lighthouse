/**
 * @license
 * Copyright 2016 Google Inc. All rights reserved.
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
 * @fileoverview Audit a page to see if it is using Mutation Events (and suggest
 *     MutationObservers instead).
 */

'use strict';

const URL = require('../../lib/url-shim');
const Audit = require('../audit');
const Formatter = require('../../report/formatter');

class NoMutationEventsAudit extends Audit {
  /**
   * @return {!AuditMeta}
   */
  static get meta() {
    return {
      category: 'JavaScript',
      name: 'no-mutation-events',
      description: 'Avoids Mutation Events in its own scripts',
      helpText: 'Mutation Events are deprecated and harm performance. Consider using Mutation ' +
          'Observers instead. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/mutation-events).',
      requiredArtifacts: ['ChromeConsoleMessages']
    };
  }

  /**
   * @param {!Artifacts} artifacts
   * @return {!AuditResult}
   */
  static audit(artifacts) {
    const results = Audit.getViolationResults(artifacts, /mutation/);

    return {
      rawValue: results.length === 0,
      extendedInfo: {
        formatter: Formatter.SUPPORTED_FORMATS.URL_LIST,
        value: results,
      },
    };
  }
}

module.exports = NoMutationEventsAudit;
