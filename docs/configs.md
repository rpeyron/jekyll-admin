---
title: Configuration Options
permalink: /configs/
--- 

Jekyll Admin related options can be specified in `_config.yml`
under a key called `jekyll_admin`.

### Config Options

#### `hidden_links`

For hiding unwanted links on the sidebar. 

The following keys under `hidden_links` can be used in order to hide default links:

```yaml
jekyll_admin:
  hidden_links:
    - posts
    - pages
    - staticfiles
    - datafiles
    - configuration
```

#### `homepage`

Web page set as the default or start-up page for Jekyll Admin.

Valid values for `homepage`: `pages` (default), `posts`, `<collection_name>`,
`datafiles`, `staticfiles` ,`drafts` and `configuration`

```yaml
jekyll_admin:
  homepage: "posts"
```


#### `header_buttons`

Add buttons in the header to open custom links. You may provide for each link:
- `title`: the button label
- `url`: the URL to be opened
- `icon`: the fontawesome icon to be used (if none, the view icon will be used)

```yaml
jekyll_admin:
  header_buttons:
   - title: Google
     url: 'https://www.google.com'
     icon: search
```


#### `force_show_drafts`

On some cases you want to use multiple config files or `--drafts` command line switch that won't be properly
detected by jekyll-admin. This flag can force jekyll-admin to display the draft section in the sidebar
even if `show_draft: true` hasn't been detected in the config file.

It will only force display, not enable drafts. So be sure to have enabled drafts on jekyll.

```yaml
jekyll_admin:
  force_show_drafts: true
```
#### `new_meta_defaults`

Add default values for meta fields of new drafts or posts.

This is useful to define some meta fields that you want not to forget to set on your pages, but that do not have a default value given in `defaults` section of `_config.yml`.

```yaml
jekyll_admin:
  new_meta_defaults:
    date: ''
    image: ''
    tags: []
    categories: []
    ...
```



