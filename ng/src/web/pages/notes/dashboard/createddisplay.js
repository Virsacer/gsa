/* Greenbone Security Assistant
 *
 * Authors:
 * Steffen Waterkamp <steffen.waterkamp@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2018 Greenbone Networks GmbH
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
import _ from 'gmp/locale';

import {NOTES_FILTER_FILTER} from 'gmp/models/filter';

import Theme from 'web/utils/theme';

import CreatedDisplay from 'web/components/dashboard2/display/created/createddisplay'; // eslint-disable-line max-len
import DataTableDisplay from 'web/components/dashboard2/display/datatabledisplay'; // eslint-disable-line max-len
import transformCreated from 'web/components/dashboard2/display/created/createdtransform'; // eslint-disable-line max-len
import createDisplay from 'web/components/dashboard2/display/createDisplay';
import {registerDisplay} from 'web/components/dashboard2/registry';

import {NotesCreatedLoader} from './loaders';

export const NotesCreatedDisplay = createDisplay({
  loaderComponent: NotesCreatedLoader,
  displayComponent: CreatedDisplay,
  title: ({data: tdata}) => _('Notes by Creation Time'),
  yAxisLabel: _('# of Created Notes'),
  y2AxisLabel: _('Total Notes'),
  xAxisLabel: _('Time'),
  yLine: {
    color: Theme.darkGreen,
    label: _('Created Notes'),
  },
  y2Line: {
    color: Theme.darkGreen,
    dashArray: '3, 2',
    label: _('Total Notes'),
  },
  displayName: 'NotesCreatedDisplay',
  displayId: 'note-by-created',
  filtersFilter: NOTES_FILTER_FILTER,
});


export const NotesCreatedTableDisplay = createDisplay({
  loaderComponent: NotesCreatedLoader,
  displayComponent: DataTableDisplay,
  title: ({data: tdata}) => _('Notes by Creation Time'),
  dataTitles: [
    _('Creation Time'),
    _('# of Notes'),
    _('Total Notes'),
  ],
  dataRow: row => [row.label, row.y, row.y2],
  dataTransform: transformCreated,
  displayName: 'NotesCreatedTableDisplay',
  displayId: 'note-by-created-table',
  filtersFilter: NOTES_FILTER_FILTER,
});

registerDisplay(NotesCreatedDisplay.displayId,
  NotesCreatedDisplay, {
    title: _('Chart: Notes by Creation Time'),
  },
);

registerDisplay(NotesCreatedTableDisplay.displayId,
  NotesCreatedTableDisplay, {
    title: _('Table: Notes by Creation Time'),
  },
);

// vim: set ts=2 sw=2 tw=80: