build:
	rm -rf output && mkdir output
	GOARCH=wasm GOOS=js go build -o $(PWD)/output/web/app.wasm
	go build -o output/builder
	cd output && ./builder
	rm output/builder
serve:
	(sleep 1 && open http://localhost || :) &
	python3 -m http.server 80 --directory $(PWD)/output
