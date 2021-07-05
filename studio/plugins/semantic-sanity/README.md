# Semantic Sanity

Use the Sanity Schema as base for an OWL ontology and a JSON-LD Context!

## Config

Add `semantic-sanity.json` in the `sstudio/config` folder. `base` is the url used for every document and object in the dataset. `vocab` defines the default prefix and url to use for the *classes* and *properties*.

```json
{
  "base": "http://data.example.org/",
  "vocab": {
    "prefix": "ex",
    "uri": "http://example.org/model/0.1/"
  }
}
```

## Options

Add `options` to documents, objects and propertis.

```
options: {
  exclude: false | true
  jsonld: {
    context: {
      '@container': '@set' | '@list',
      '@type': '@id' | '@json',
      '@id': '[Some URL]'
    }
  }
}
```