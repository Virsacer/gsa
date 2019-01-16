/* Copyright (C) 2017-2019 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 */
import React from 'react';

import {_l} from 'gmp/locale/lang';

import Layout from 'web/components/layout/layout';

import compose from 'web/utils/compose';
import withCapabilities from 'web/utils/withCapabilities';

/* eslint-disable max-len */

import ApplyOverridesGroup from 'web/components/powerfilter/applyoverridesgroup';
import CreateNamedFilterGroup from 'web/components/powerfilter/createnamedfiltergroup';
import FilterStringGroup from 'web/components/powerfilter/filterstringgroup';
import FirstResultGroup from 'web/components/powerfilter/firstresultgroup';
import MinQodGroup from 'web/components/powerfilter/minqodgroup';
import ResultsPerPageGroup from 'web/components/powerfilter/resultsperpagegroup';
import SortByGroup from 'web/components/powerfilter/sortbygroup';
import withFilterDialog from 'web/components/powerfilter/withFilterDialog';
import FilterDialogPropTypes from 'web/components/powerfilter/dialogproptypes';

/* eslint-enable */


const SORT_FIELDS = [
  {
    name: 'date',
    displayName: _l('Date'),
  },
  {
    name: 'status',
    displayName: _l('Status'),
  },
  {
    name: 'task',
    displayName: _l('Task'),
  },
  {
    name: 'severity',
    displayName: _l('Severity'),
  },
  {
    name: 'high',
    displayName: _l('Scan Results: High'),
  },
  {
    name: 'medium',
    displayName: _l('Scan Results: Medium'),
  },
  {
    name: 'low',
    displayName: _l('Scan Results: Low'),
  },
  {
    name: 'log',
    displayName: _l('Scan Results: Log'),
  },
  {
    name: 'false_positive',
    displayName: _l('Scan Results: False Positive'),
  },
];

const ReportFilterDialogComponent = ({
    capabilities,
    filter,
    filterName,
    filterNameValid,
    filterstring,
    saveNamedFilter,
    onFilterStringChange,
    onFilterValueChange,
    onSortByChange,
    onSortOrderChange,
    onValueChange,
  }) => {

  if (!filter) {
    return null;
  }

  return (
    <Layout flex="column">

      <FilterStringGroup
        name="filterstring"
        filter={filterstring}
        onChange={onFilterStringChange}
      />

      <ApplyOverridesGroup filter={filter} onChange={onFilterValueChange}/>

      <MinQodGroup
        name="min_qod"
        filter={filter}
        onChange={onFilterValueChange}
      />

      <FirstResultGroup
        filter={filter}
        onChange={onFilterValueChange}
      />

      <ResultsPerPageGroup
        filter={filter}
        onChange={onFilterValueChange}
      />

      <SortByGroup
        filter={filter}
        fields={SORT_FIELDS}
        onSortOrderChange={onSortOrderChange}
        onSortByChange={onSortByChange}
      />

      {capabilities.mayCreate('filter') &&
        <CreateNamedFilterGroup
          filter={filter}
          filterName={filterName}
          filterNameValid={filterNameValid}
          saveNamedFilter={saveNamedFilter}
          onValueChange={onValueChange}
        />
      }
    </Layout>
  );
};

ReportFilterDialogComponent.propTypes = FilterDialogPropTypes;

export default compose(
  withCapabilities,
  withFilterDialog(),
)(ReportFilterDialogComponent);

// vim: set ts=2 sw=2 tw=80:
