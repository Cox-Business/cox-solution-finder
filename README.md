# cox-solution-finder

This project has two modes: showroom and website. The default view is the
website, all templates for this view reside in `templates/views`. This is
the default folder for keystone.

The `.env` is ignored by git, *do not add it to the repo*.

## Configuration variables

    SOLUTION_MODE     SOLUTION_MODE=showroom enables showroom mode
                      Views directory is set to: templates/views/showroom.

    STATIC_URI        URI the staticize process should hit to get the HTML versions
                      of the showroom application.

## Keystone Version

This project is using a custom version of KeystoneJS, do not update to normal Keystone
without the fix included.
