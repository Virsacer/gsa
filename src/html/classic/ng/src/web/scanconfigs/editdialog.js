/* Greenbone Security Assistant
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2017 Greenbone Networks GmbH
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

import _ from '../../locale.js';
import {is_defined, map} from '../../utils.js';

import Layout from '../layout.js';
import PropTypes from '../proptypes.js';
import Section from '../section.js';
import {render_options} from '../render.js';

import {withDialog} from '../dialog/dialog.js';

import Checkbox from '../form/checkbox.js';
import FormGroup from '../form/formgroup.js';
import Radio from '../form/radio.js';
import TextField from '../form/textfield.js';
import Select2 from '../form/select2.js';

import EditIcon from '../icons/editicon.js';

import Table from '../table/table.js';
import TableBody from '../table/body.js';
import TableData from '../table/data.js';
import TableHeader from '../table/header.js';
import TableHead from '../table/head.js';
import TableRow from '../table/row.js';

import Trend from './trend.js';

import {
  OPENVAS_SCAN_CONFIG_TYPE,
  OSP_SCAN_CONFIG_TYPE,
} from '../../gmp/models/scanconfig.js';

class NvtPreference extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.preference !== this.props.preference;
  }

  render() {
    let {
      preference,
    } = this.props;
    return (
      <TableRow>
        <TableData style={{overflowWrap: 'break-word'}}>
          {preference.nvt.name}
        </TableData>
        <TableData style={{overflowWrap: 'break-word'}}>
          {preference.name}
        </TableData>
        <TableData>
          {preference.value}
        </TableData>
        <TableData>
        </TableData>
      </TableRow>
    );
  }
}

NvtPreference.propTypes = {
  preference: PropTypes.object.isRequired,
};

class NvtPreferences extends React.Component {

  render() {
    let {
      preferences,
    } = this.props;
    return (
      <Section
        foldable
        title={_('Network Vulnerability Test Preferences')}
      >
        <Table fixed>
          <TableHeader>
            <TableRow>
              <TableHead width="30%">
                {_('NVT')}
              </TableHead>
              <TableHead width="30%">
                {_('Name')}
              </TableHead>
              <TableHead width="30%">
                {_('Value')}
              </TableHead>
              <TableHead width="10%">
                {_('Actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              map(preferences, pref => {
                return (
                  <NvtPreference
                    key={pref.nvt.name + pref.name}
                    preference={pref}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      </Section>
    );
  }
}

NvtPreferences.propTypes = {
  preferences: PropTypes.arrayLike.isRequired,
};

class ScannerPreference extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.preference !== this.props.preference ||
      nextProps.value !== this.props.value;
  }

  render() {
    let {
      preference,
      value,
      onPreferenceChange,
    } = this.props;
    const {hr_name, name} = preference;
    const is_radio = name === 'ping_hosts' || name === 'reverse_lookup' ||
      name === 'unscanned_closed' || name === 'nasl_no_signature_check' ||
      name === 'ping_hosts' || name === 'reverse_lookup' ||
      name === 'unscanned_closed_udp' || name === 'auto_enable_dependencies' ||
      name === 'kb_dont_replay_attacks' || name === 'kb_dont_replay_denials' ||
      name === 'kb_dont_replay_info_gathering' ||
      name === 'kb_dont_replay_scanners' || name === 'kb_restore' ||
      name === 'log_whole_attack' ||
      name === 'only_test_hosts_whose_kb_we_dont_have' ||
      name === 'only_test_hosts_whose_kb_we_have' || name === 'optimize_test' ||
      name === 'safe_checks' || name === 'save_knowledge_base' ||
      name === 'silent_dependencies' || name === 'slice_network_addresses' ||
      name === 'use_mac_addr' || name === 'drop_privileges' ||
      name === 'network_scan' || name === 'report_host_details';
    return (
      <TableRow>
        <TableData>
          {hr_name}
        </TableData>
        <TableData>
          {is_radio ?
            <Layout flex>
              <Radio
                title={_('Yes')}
                value="yes"
                name={name}
                checked={value === 'yes'}
                onChange={onPreferenceChange}
              />
              <Radio
                title={_('No')}
                value="no"
                name={name}
                checked={value === 'no'}
                onChange={onPreferenceChange}
              />
            </Layout> :
              <TextField
                name={name}
                value={value}
                onChange={onPreferenceChange}
              />
          }
        </TableData>
        <TableData>
          {preference.default}
        </TableData>
      </TableRow>
    );
  }
}

ScannerPreference.propTypes = {
  preference: PropTypes.object.isRequired,
  value: PropTypes.any.isRequired,
  onPreferenceChange: PropTypes.func,
};

class ScannerPreferences extends React.Component {

  constructor(...args) {
    super(...args);

    this.onPreferenceChange = this.onPreferenceChange.bind(this);
  }

  onPreferenceChange(value, name) {
    let {values, onValueChange} = this.props;

    values[name] = value;

    onValueChange(values, 'scanner_preference_values');
  }

  render() {
    let  {preferences, values} = this.props;
    return (
      <Section
        foldable
        title={_('Edit Scanner Preferences')}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {_('Name')}
              </TableHead>
              <TableHead>
                {_('New Value')}
              </TableHead>
              <TableHead>
                {_('Default Value')}
              </TableHead>
              <TableHead>
                {_('Actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              map(preferences, pref => {
                return (
                  <ScannerPreference
                    key={pref.name}
                    preference={pref}
                    value={values[pref.name]}
                    onPreferenceChange={this.onPreferenceChange}
                  />
                );
              })
            }
          </TableBody>
        </Table>
      </Section>
    );
  }
}


ScannerPreferences.propTypes = {
  preferences: PropTypes.arrayLike.isRequired,
  values: PropTypes.object.isRequired,
  onValueChange: PropTypes.func,
};

class NvtFamily extends React.Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.config !== this.props.config ||
      nextProps.family !== this.props.family ||
      nextProps.select !== this.props.select ||
      nextProps.trend !== this.props.trend;
  }

  render() {
    let {
      config,
      family,
      select,
      trend,
      onEditConfigFamilyClick,
      onSelectChange,
      onTrendChange,
    } = this.props;
    let {name} = family;
    let config_family = config.families[name];
    let counts = {
      count: 0,
      max: family.max,
    };

    if (is_defined(config_family)) {
      counts.count = config_family.nvts.count;
      counts.max = config_family.nvts.max;
    }

    return (
      <TableRow key={name}>
        <TableData>
          {name}
        </TableData>
        <TableData>
          <Layout flex align="end">
            {_('{{count}} of {{max}}', counts)}
          </Layout>
        </TableData>
        <TableData flex align={['center', 'center']}>
          <Radio
            flex
            name={name}
            checked={trend === '1'}
            onChange={onTrendChange}
            value="1"
          />
          <Trend trend="1"/>
          <Radio
            flex
            name={name}
            checked={trend === '0'}
            onChange={onTrendChange}
            value="0"
          />
          <Trend trend="0"/>
        </TableData>
        <TableData flex align={['center', 'center']}>
          <Checkbox
            flex
            name={name}
            checked={select === '1'}
            value="1"
            checkedValue="1"
            unCheckedValue="0"
            onChange={onSelectChange}
          />
        </TableData>
        <TableData flex align="center">
          <EditIcon
            title={_('Select and edit NVT details')}
            value={{name, config}}
            onClick={onEditConfigFamilyClick}
          />
        </TableData>
      </TableRow>
    );
  }
}

NvtFamily.propTypes = {
  config: PropTypes.model.isRequired,
  family: PropTypes.object.isRequired,
  select: PropTypes.oneOf([
    '1', '0',
  ]).isRequired,
  trend: PropTypes.oneOf([
    '1', '0',
  ]).isRequired,
  onEditConfigFamilyClick: PropTypes.func,
  onSelectChange: PropTypes.func,
  onTrendChange: PropTypes.func,
};

class NvtFamilies extends React.Component {

  constructor(...args) {
    super(...args);

    this.onSelectChange = this.onSelectChange.bind(this);
    this.onTrendChange = this.onTrendChange.bind(this);
  }

  onSelectChange(value, name) {
    let {select, onValueChange} = this.props;

    select[name] = value;

    onValueChange(select, 'select');
  }

  onTrendChange(value, name) {
    let {trend, onValueChange} = this.props;

    trend[name] = value;

    onValueChange(trend, 'trend');
  }

  render() {
    let {
      config,
      families,
      trend,
      select,
      onEditConfigFamilyClick,
    } = this.props;

    return (
      <Section
        foldable
        title={_('Edit Network Vulnerability Test Families')}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {_('Family')}
              </TableHead>
              <TableHead>
                {_('NVTs selected')}
              </TableHead>
              <TableHead>
                {_('Trend')}
              </TableHead>
              <TableHead width="8em">
                {_('Select all NVTs')}
              </TableHead>
              <TableHead>
                {_('Actions')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              map(families, family => {
                let {name} = family;
                return (
                  <NvtFamily
                    key={name}
                    config={config}
                    family={family}
                    trend={trend[name]}
                    select={select[name]}
                    onEditConfigFamilyClick={onEditConfigFamilyClick}
                    onSelectChange={this.onSelectChange}
                    onTrendChange={this.onTrendChange}
                  />
                );
              })
            }
            <TableRow>
              <TableData>
                {_('Total: {{count}}', {count: config.families.count})}
              </TableData>
              <TableData flex align="end">
                {_('{{known}} of {{max}}', config.nvts)}
              </TableData>
            </TableRow>
          </TableBody>
        </Table>
      </Section>
    );
  }
}

NvtFamilies.propTypes = {
  config: PropTypes.model.isRequired,
  families: PropTypes.arrayLike.isRequired,
  select: PropTypes.object.isRequired,
  trend: PropTypes.object.isRequired,
  onEditConfigFamilyClick: PropTypes.func,
  onValueChange: PropTypes.func,
};

class EditDialog extends React.Component {

  render() {
    let {
      comment,
      config,
      families,
      name,
      scanner_id,
      scanner_preference_values,
      scanners,
      select,
      trend,
      onEditConfigFamilyClick,
      onValueChange,
    } = this.props;
    return (
      <Layout flex="column">

        <FormGroup title={_('Name')}>
          <TextField
            name="name"
            grow="1"
            value={name}
            size="30"
            onChange={onValueChange}
            maxLength="80"/>
        </FormGroup>

        <FormGroup title={_('Comment')}>
          <TextField
            name="comment"
            value={comment}
            grow="1"
            size="30"
            maxLength="400"
            onChange={onValueChange}/>
        </FormGroup>

        {!config.isInUse() && config.type === OSP_SCAN_CONFIG_TYPE &&
          <FormGroup title={_('Scanner')}>
            <Select2
              name="scanner_id"
              value={scanner_id}
              onChange={onValueChange}
            >
              {render_options(scanners)}
            </Select2>
          </FormGroup>
        }

        {!config.isInUse() && config.type === OPENVAS_SCAN_CONFIG_TYPE &&
          <NvtFamilies
            config={config}
            families={families}
            trend={trend}
            select={select}
            onEditConfigFamilyClick={onEditConfigFamilyClick}
            onValueChange={onValueChange}
          />
        }

        {!config.isInUse() &&
          <ScannerPreferences
            values={scanner_preference_values}
            preferences={config.preferences.scanner}
            onValueChange={onValueChange}
          />
        }

        {!config.isInUse() && config.type === OPENVAS_SCAN_CONFIG_TYPE &&
          <NvtPreferences
            preferences={config.preferences.nvt}
            onValueChange={onValueChange}
          />
        }

      </Layout>
    );
  }
}

EditDialog.propTypes = {
  comment: PropTypes.string,
  config: PropTypes.model.isRequired,
  families: PropTypes.arrayLike,
  name: PropTypes.string,
  scanners: PropTypes.arrayLike,
  scanner_id: PropTypes.id,
  scanner_preference_values: PropTypes.object,
  select: PropTypes.object,
  trend: PropTypes.object,
  onEditConfigFamilyClick: PropTypes.func,
  onValueChange: PropTypes.func,
};

export default withDialog(EditDialog, {
  footer: _('Save'),
  defaultState: {
    comment: '',
  },
});

// vim: set ts=2 sw=2 tw=80: