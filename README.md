# TEDxUTSC
TEDxUTSC official website

## Pre-requisites

* UNIX based operating system (macOS or Linux)
* Ruby and Jekyll

## Development Server

To start a development server, first make sure you installed all dependencies, then simply run the following command:

```bash
$ ./start.sh development
```

`start.sh` takes care of injecting environment and build numbers.

## Environment Variable Injection

The website supports environment variable injection, you can find the injection plugin at `_plugins/env_variables.rb`.

To inject a new variable, insert the following line in the file:

```ruby
site.config['variable_name'] = ENV['VARIABLE_NAME'] || 'default_value'
```
