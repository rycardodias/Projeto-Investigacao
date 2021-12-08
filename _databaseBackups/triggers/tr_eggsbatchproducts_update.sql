-- Trigger: tr_eggsbatchproducts_update

DROP TRIGGER IF EXISTS tr_eggsbatchproducts_update ON public."EggsBatchProducts";

CREATE TRIGGER tr_eggsbatchproducts_update
    BEFORE UPDATE
    ON public."EggsBatchProducts"
    FOR EACH ROW
    EXECUTE FUNCTION public.tr_fc_eggsbatchproducts_update();