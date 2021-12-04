-- FUNCTION: public.tr_fc_eggsbatchlines_create()

-- DROP FUNCTION public.tr_fc_eggsbatchlines_create();

CREATE FUNCTION public.tr_fc_eggsbatchlines_create()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantity integer;
BEGIN
	IF (NEW."quantity" <1) THEN
		RAISE EXCEPTION 'Quantity cannot be lower than 1';
	END IF;
	 
	NEW."quantityAvailable" = NEW."quantity";
	
	SELECT "EggsBatches"."quantity"
	  INTO v_quantity
	  FROM "EggsBatches"
	 WHERE "EggsBatches"."id" = NEW."EggsBatchId";
	 
	UPDATE "EggsBatches"
	   SET "quantity" = (v_quantity + NEW."quantity")
	 WHERE "EggsBatches"."id" = NEW."EggsBatchId";
	
	RETURN NEW;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_eggsbatchlines_create()
    OWNER TO postgres;
