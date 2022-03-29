---
description: Filter language syntax specification.
---

# Filter language syntax

Various modules in Hetty allow _filtering_ or _querying_ data. For example, the
[Proxy logs](/docs/getting-started#view-proxy-logs) page has a search bar for
querying request logs. The [Intercept](/docs/guides/intercept) module has
request and response filters that can be set to conditionally intercept HTTP
requests/responses. These features use the same query/filter language, described
in this document.

## Syntax notation

The filter language syntax is loosely based on the syntax used by [Google's
Cloud Logging
feature](https://cloud.google.com/logging/docs/view/logging-query-language).

### Expressions

A "filter" or "search query" (the semantics differ based on where the language
is used) can be formalized as an _expression_:

```
expression = ["NOT"] comparison { ("AND" | "OR") ["NOT"] comparison }
```

A _comparison_ is either a single value or a Boolean expression:

```
"Lorem ipsum dolor sit amet"
req.method = "GET"
```

#### Single values (string literal)

A single value expression (e.g. `"secret"`) is implicitly evaluated using the
"has" operator, against any known parameter applicable in the query/filter's
context. For example, when searching proxy logs for `"secret"`, requests are
returned where any of the request parameters (proto, URL, body) or response
parameters (status code, status reason, body) contains the word "secret" (case
insensitive).

#### Boolean expressions

Boolean expressions can be formalized as:

```
[IDENT] [OP] [VALUE]
```

- `IDENT` is a well-known identifier relevant to the context of the expression.
  See [Intercept: Filtering](/docs/guides/intercept#filtering) for an example of
  the supported identifiers when defining an intercept filter expression.
- `OP` is a comparison operator. See: [Comparison operators].
- `VALUE` is a string literal used to compare the resolved identifier value
  against.

### Boolean operators

The following Boolean operators are supported, with precedence sorted from high
to low:

- `NOT`
- `OR`
- `AND`

You can use parenthesis to nest boolean expressions.

:::info

Boolean operators (`NOT`, `OR`, `AND`) are case sensitive.

:::

### Comparison operators

The following comparison operators are supported for [Boolean expressions](#boolean-expressions):

| Operator | Description                                                                                                                                                                            |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `=`      | Expression evaluates to _true_ if two operands (coerced to strings) are lexographically equal.                                                                                         |
| `!=`     | Expression evaluates to _true_ if two operands (coerced to strings) are **not** lexographically equal.                                                                                 |
| `>`      | Expression evaluates to _true_ if the left operand (coerced to string) is lexographically _greater than_ the right operand (coerced to string).                                        |
| `<`      | Expression evaluates to _true_ if the left operand (coerced to string) is lexographically _less than_ the right operand (coerced to string).                                           |
| `>=`     | Inequality operator, where expression evaluates to _true_ if the left operand (coerced to string) is lexographically _greater than or equal to_ the right operand (coerced to string). |
| `<=`     | Expression evaluates to _true_ if the left operand (coerced to string) is lexographically _less than or equal to_ the right operand (coerced to string).                               |
| `=~`     | Used for regular expression matching. The right operand is parsed as a regular expression. Evaluates to _true_ if the left operand matches the regular expression.                     |
| `!~`     | Used for regular expression matching. The right operand is parsed as a regular expression. Evaluates to _true_ if the left operand **doesn't** match the regular expression.           |

:::info

The behavior of `<`, `>`, `<=` and `>=` will likely change in the future.
Operands are now always coerced to string values, but coersion to integer values
will make more sense for some well-known identifiers (e.g. for expressions like
`res.statusCode > 400`).

:::
