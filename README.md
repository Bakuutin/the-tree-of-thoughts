# The tree of thoughts

A probabilistic tree structure based on a given text prompt is a way of visually
representing the different possible continuations of that text.

Generate your own data with
[this Colab notebook](https://colab.research.google.com/drive/1zdUS0bIR8IIbQjxMkvPLdofiImlDR3mn#scrollTo=2eSvM9zX_2d3)
and replace `data/graph.json`.

## Run

Serve the folder with any static web server and open the printed URL, e.g.:

~~~sh
python3 -m http.server 8080
~~~

No build step and no network access needed — D3 is included in `vendor/d3/`.

## Files

- `index.html` — page
- `main.js` — force-directed tree visualization
- `data/graph.json` — `{nodes: [{id, token, probability, x, y}], edges: [{source, target}]}`
- `vendor/d3/` — [D3](https://d3js.org) v7.9.0

## License

© [tigor](https://tigor.net/me) <me@tigor.net>. Code and data are licensed under
[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/);
see `LICENSE`.

D3 in `vendor/d3/` is © Mike Bostock under the ISC license; see `vendor/d3/LICENSE`.
