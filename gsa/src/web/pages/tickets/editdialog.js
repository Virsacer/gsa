/* Copyright (C) 2019-2020 Greenbone Networks GmbH
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation, either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React from 'react';

import _ from 'gmp/locale';

import {TICKET_STATUS, TICKET_STATUS_TRANSLATIONS} from 'gmp/models/ticket';

import SaveDialog from 'web/components/dialog/savedialog';

import Layout from 'web/components/layout/layout';

import FormGroup from 'web/components/form/formgroup';
import Select from 'web/components/form/select';
import TextArea from 'web/components/form/textarea';

import PropTypes from 'web/utils/proptypes';
import {renderSelectItems} from 'web/utils/render';
import useForm, {syncVariables} from 'web/components/form/useForm';
import {editTicketRules as validationRules} from './validationrules';
import ErrorBubble from 'web/components/form/errorbubble';

const STATUS = [TICKET_STATUS.open, TICKET_STATUS.fixed, TICKET_STATUS.closed];

const STATUS_ITEMS = STATUS.map(status => ({
  value: status,
  label: TICKET_STATUS_TRANSLATIONS[status],
}));

const EditTicketDialog = ({
  closedNote = '',
  fixedNote = '',
  openNote = '',
  ticketId,
  title = _('Edit Ticket'),
  status,
  userId,
  users,
  onClose,
  onSave,
}) => {
  const stateSchema = {
    // variables needing validation
    openNote,
    closedNote,
    fixedNote,
  };

  const extras = {
    // variables not needing validation but needed as dependencies
    status,
  };

  const {
    formState,
    dependencies,
    shouldWarn,
    handleValueChange,
    handleDependencyChange,
    formStatus,
    handleSubmit,
  } = useForm(stateSchema, validationRules, onSave, extras);

  return (
    <SaveDialog
      title={title}
      onClose={onClose}
      onSave={vals => handleSubmit(vals)}
      values={{
        ticketId,
      }}
      defaultValues={{
        closedNote,
        fixedNote,
        openNote,
        status,
        userId,
      }}
    >
      {({values, onValueChange}) => {
        syncVariables(values, formState, dependencies);

        return (
          <Layout flex="column">
            <FormGroup title={_('Status')}>
              <Select
                name="status"
                items={STATUS_ITEMS}
                value={dependencies.status}
                onChange={handleDependencyChange}
              />
            </FormGroup>
            <FormGroup title={_('Assigned User')}>
              <Select
                name="userId"
                items={renderSelectItems(users)}
                value={values.userId}
                onChange={onValueChange}
              />
            </FormGroup>
            <ErrorBubble
              visible={shouldWarn && !formStatus.openNote.validity}
              content={formStatus.openNote.error}
            >
              {({targetRef}) => (
                <div ref={targetRef}>
                  <FormGroup title={_('Note for Open')}>
                    <TextArea
                      name="openNote"
                      grow="1"
                      rows="5"
                      value={formState.openNote}
                      onChange={handleValueChange}
                    />
                  </FormGroup>
                </div>
              )}
            </ErrorBubble>
            <ErrorBubble
              visible={shouldWarn && !formStatus.fixedNote.validity}
              content={formStatus.fixedNote.error}
            >
              {({targetRef}) => (
                <div ref={targetRef}>
                  <FormGroup title={_('Note for Fixed')}>
                    <TextArea
                      name="fixedNote"
                      grow="1"
                      rows="5"
                      value={formState.fixedNote}
                      onChange={handleValueChange}
                    />
                  </FormGroup>
                </div>
              )}
            </ErrorBubble>
            <ErrorBubble
              visible={shouldWarn && !formStatus.closedNote.validity}
              content={formStatus.closedNote.error}
            >
              {({targetRef}) => (
                <div ref={targetRef}>
                  <FormGroup title={_('Note for Closed')}>
                    <TextArea
                      name="closedNote"
                      grow="1"
                      rows="5"
                      value={formState.closedNote}
                      onChange={handleValueChange}
                    />
                  </FormGroup>
                </div>
              )}
            </ErrorBubble>
          </Layout>
        );
      }}
    </SaveDialog>
  );
};

EditTicketDialog.propTypes = {
  closedNote: PropTypes.string,
  fixedNote: PropTypes.string,
  openNote: PropTypes.string,
  status: PropTypes.oneOf(STATUS),
  ticketId: PropTypes.id.isRequired,
  title: PropTypes.toString,
  userId: PropTypes.id.isRequired,
  users: PropTypes.arrayOf(PropTypes.model),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditTicketDialog;

// vim: set ts=2 sw=2 tw=80:
