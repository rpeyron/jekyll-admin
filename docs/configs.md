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
- `title`: (optional) the button label
- `url`: (optiona) the URL to be opened
- `api`: (optional) the API call to make when clicked
- `icon`: (optional) the fontawesome icon to be used (if none, the view icon will be used)
- `items`: (optional) items to be included in a drop down

```yaml
jekyll_admin:
  header_buttons:
   - title: Google
     url: 'https://www.google.com'
     icon: search
   - title: Menu
     icon: search
     items: 
      - title: Google
        url: 'https://www.google.com'
        icon: search
      - title: Bing
        url: 'https://www.bing.com'
        icon: search
```



#### `sidebarFrames`

Add entries on the sidebar to display framed contents. 

Define an array with objects having the following properties:
- `title`: the title displayed in the sidebar
- `url`: the URL to be opened in the frame
- `icon`: the fontawesome identifier of icon to display

Note that many sites do not allow to be displayed in frames.

```yaml
jekyll_admin:
  sidebarFrames:
    - url: "https://rpeyron.github.io/verres"
      title: Verres
      icon: fire
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


#### `editors` and `default_editor`

Specify the list of editors you want to have, and the default one. 

```yaml
jekyll_admin:
  editors: [SimpleMDE, TinyMDE, TextArea, TUI_WW, TUI_SS, TUI_Tab]
  default_editor: TinyMDE
```




