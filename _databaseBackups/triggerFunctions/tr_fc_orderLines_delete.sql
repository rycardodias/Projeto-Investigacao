-- FUNCTION: public.tr_fc_orderlines_delete()

-- DROP FUNCTION public.tr_fc_orderlines_delete();

CREATE FUNCTION public.tr_fc_orderlines_delete()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
	v_quantityAvailable integer default 0;
	v_newQuantityAvailable integer default 0;
BEGIN
	IF(OLD."AnimalProductId" IS NOT NULL) THEN
		SELECT "quantityAvailable"
		  INTO v_quantityAvailable
		  FROM public."AnimalProducts"
		 WHERE "id" = OLD."AnimalProductId";
		 
		 v_newQuantityAvailable = (v_quantityAvailable + OLD."quantity");

	   UPDATE public."AnimalProducts" SET  "quantityAvailable"= v_newQuantityAvailable
		WHERE "id" = OLD."AnimalProductId";
	ELSE
		SELECT "quantityAvailable"
		  INTO v_quantityAvailable
	 	 FROM public."EggsBatchProducts"
		 WHERE "id" = OLD."EggsBatchProductId";
	
		v_newQuantityAvailable = (v_quantityAvailable + OLD."quantity");

	   UPDATE public."EggsBatchProducts" SET  "quantityAvailable"= v_newQuantityAvailable
		WHERE "id" = OLD."EggsBatchProductId";
	END IF;
	
	RETURN OLD;
END;
$BODY$;

ALTER FUNCTION public.tr_fc_orderlines_delete()
    OWNER TO postgres;
