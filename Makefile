.PHONY: migrate
migrate:
	@docker exec cabinfy-backend npx prisma migrate deploy

.PHONY: seed
seed:
	@docker exec cabinfy-backend npx prisma db seed

.PHONY: build
build:
	@cd frontend && npm run build && cd ..

.PHONY: remote
remote:
	@cd frontend && scp -r dist nicolas@106.14.126.186:~/cabinfy/react-build && cd ..
