/* Greenbone Security Assistant
 * $Id$
 * Description: Http Parameter handling in GSA
 *
 * Authors:
 * Björn Ricks <bjoern.ricks@greenbone.net>
 *
 * Copyright:
 * Copyright (C) 2016 Greenbone Networks GmbH
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

#ifndef _GSAD_PARAMS_H
#define _GSAD_PARAMS_H

#include <glib.h>
#include <microhttpd.h>

#define params_t GHashTable

/* Params. */

/**
 * @brief Request parameter.
 */
struct param
{
  gchar *value;          /* Value. */
  gchar *original_value; /* Original value, before validation. */
  gchar *filename;       /* Filename. */
  params_t *values;      /* Multiple binary values. */
  int valid;             /* Validation flag. */
  int valid_utf8;        /* UTF8 validation flag. */
  int value_size;        /* Size of value, excluding trailing NULL. */
  int array_len;         /* The number of items of "array" params */
};

/**
 * @brief Request parameter.
 */
typedef struct param param_t;

params_t *params_new ();

void params_free (params_t *);

int params_given (params_t *, const char *);

const char *params_value (params_t *, const char *);

int params_value_size (params_t *, const char *);

const char *params_original_value (params_t *, const char *);

const char *params_filename (params_t *, const char *);

params_t *params_values (params_t *, const char *);

param_t *params_get (params_t *, const char *);

int params_valid (params_t *, const char *);

param_t *params_add (params_t *, const char *, const char *);

param_t *params_append_bin (params_t *, const char *, const char *, int, int);

#define params_iterator_t GHashTableIter

#define params_iterator_init g_hash_table_iter_init

gboolean params_iterator_next (params_iterator_t *, char **, param_t **);

int params_mhd_add (void *params, enum MHD_ValueKind kind, const char *name,
                    const char *value);

void params_mhd_validate (void *params);

#endif /* _GSAD_PARAMS_H */
