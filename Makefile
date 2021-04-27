ENTRY_POINT := ./src/mod.ts

default:
	make dev

dev:
	denon run --unstable --allow-read --allow-net  $(ENTRY_POINT) 

format:
	deno fmt

install:
	deno install --unstable --allow-read --allow-run -f https://deno.land/x/denon/denon.ts;

run:
	denon run --allow-net --unstable $(ENTRY_POINT) 

test:
	deno test

test/watch:
	denon --test --config denon.json