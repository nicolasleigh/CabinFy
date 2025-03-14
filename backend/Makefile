.PHONY: compose/build compose/up db/seed

compose/build:
	@docker compose up --build

compose/up:
	@docker compose up --detach

db/seed:
	@npx prisma db seed 