---
description: How to intercept HTTP requests and responses.
---

import interceptPending from "../assets/intercept-pending.png";
import interceptEditReq from "../assets/intercept-edit-req.png";
import interceptEditRes from "../assets/intercept-edit-res.png";

# Intercepting HTTP traffic

HTTP traffic passing through the proxy server can be _intercepted_. An
intercepted request or response means the roundtrip is halted by the server,
awaiting manual action. Stalled requests/responses can be inspected and
(optionally) edited, before letting them continue to be sent/received.
Alternatively, you can _cancel_ an intercepted request or response. This causes
the HTTP request roundtrip to be dropped altogether. These actions are described
in more detail below.

## Requests

### Enabling request interception

1. To intercept incoming HTTP requests, first start Hetty and open a project
   (see: [Getting Started](/docs/getting-started)).
2. In the admin interface, open the _Projects_ page, via the folder icon in the
   vertical menu bar.
3. Click the cog icon next to the currently open project to open its settings
   page.
4. On the _Intercept_ tab, toggle the switch next to _Enable request
   interception_.

### Intercepting a request

1. Make an HTTP request with a client (e.g. a browser) configured to use the
   proxy (see: [Use the proxy](/docs/getting-started#use-the-proxy)).
2. You should see a badge popping up in the vertical menu bar, indicating that
   something was intercepted:

   <img src={interceptPending} width="55" alt="Pending intercepted request (screenshot)" />

3. Open the _Intercept_ page by clicking on this intercept icon.
4. The first pending request/response will automatically open. Here you can view
   and edit the request parameters. For example: the URL, method, request
   headers and body.

   <img src={interceptEditReq} width="1512" alt="Edit intercepted request (screenshot)" />

You now have the following two options:

- Send the (modified) request
- Cancel the request

#### Send the (modified) request

1. To continue sending the request, click _Send_.
2. After it's sent, the request will disappear from the intercept page.
3. If you've enabled [_response_ interception](#enabling-response-interception)
   as well, the response to the (modified) request will pop up in the intercept
   window. If the [response filter](#response-filter) is set, this only happens
   if there's a match.

:::tip

You can find the (modified) HTTP request in the _Proxy logs_.

:::

#### Cancelling the request

1. To prevent proxying the HTTP request, click _Cancel_. This causes the stalled
   request to be dropped. The client making the HTTP request will receive a `502 Bad Gateway` response.

The cancelled request will appear in the _Proxy logs_, but it won't have a
response log because it was cancelled before being proxied.

## Responses

### Enabling response interception

1. To intercept proxied HTTP responses, first start Hetty and open a project
   (see: [Getting Started](/docs/getting-started)).
2. In the admin interface, open the _Projects_ page, via the folder icon in the
   vertical menu bar.
3. Click the cog icon next to the currently open project to open its settings
   page.
4. On the _Intercept_ tab, toggle the switch next to _Enable response
   interception_.

### Intercepting a response

1. Make an HTTP request with a client (e.g. a browser) configured to use the
   proxy (see: [Use the proxy](/docs/getting-started#use-the-proxy)).
2. You should see a badge popping up in the vertical menu bar, indicating that
   something was intercepted.

   <img src={interceptPending} width="55" alt="Pending intercepted request (screenshot)" />

3. Open the _Intercept_ page by clicking on this intercept icon.
4. The first pending request/response will automatically open. Here you can view
   and edit the response. For example: the response headers and body.

   <img src={interceptEditRes} width="1512" alt="Edit intercepted response (screenshot)" />

You now have the following two options:

- Receive the (modified) response
- Cancel the roundtrip

#### Receive the (modified) response

1. To continue processing the response (e.g. return it to the client), click
   _Receive_.
2. The response will disappear from the intercept page.

#### Cancelling the roundtrip

1. To prevent the client from receiving a proxied response, click _Cancel_. This
   causes the stalled proxy request to be dropped. The client will receive a
   `502 Bad Gateway` response.

The cancelled request will appear in the _Proxy logs_, but it won't have a
response log because it was cancelled before being proxied.

## Filtering

By default, enabling request and/or response interception causes _all_ items to
stalled for review. Typically, you'll want to _filter_ requests and/or responses
to narrow down the manual review process to items you're interested in.

On the Intercept settings tab (see previous sections) you'll find two filters,
which can be individually set to control which items are intercepted:

- Request filter
- Response filter

Both use the same [filter language syntax](/docs/appendix/filter-lang). To _disable_ a filter (cause all items to be
intercepted), clear a filter input field and click its related "Update" button.

### Request filter

The request filter is used to match incoming HTTP requests to the proxy server.
When a request matches, it's intercepted (stalled for manual action).

The following request specific identifiers are available to use in expressions:

- `proto`
- `url`
- `method`
- `body`

#### Examples

_Requests with the domain `example.com` and method `GET`:_

`url =~ "^https?://example.com" AND method = "GET"`

_Requests with the word "foobar" in the body, or with method `POST`:_

`body =~ "foobar" OR method = "POST"`

_Requests with the word "secret" in any of the supported request parameters:_

`secret`

See [Filter language syntax](/docs/appendix/filter-lang) for more details on
how to write expressions.

### Response filter

The response filter is used to match HTTP responses to proxied requests.
When a response matches, it's intercepted (stalled for manual action).

The following response specific identifiers are available to use in expressions:

- `proto`
- `statusCode`
- `statusReason`
- `body`

#### Examples

_Responses with status code in the 4xx or 5xx range:_

`statusCode =~ "^4|5"`

_Responses with the word "foobar" in the body, or statusCode `200`:_

`body =~ "foobar" OR statusCode = "200"`

_Responses with the word "secret" in any of the supported response parameters:_

`secret`

See [Filter language syntax](/docs/appendix/filter-lang) for more details on
how to write expressions.
