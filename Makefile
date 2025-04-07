.PHONY: migrate
migrate:
	@docker exec cabinfy-backend npx prisma migrate deploy

.PHONY: seed
seed:
	@docker exec cabinfy-backend npx prisma db seed
