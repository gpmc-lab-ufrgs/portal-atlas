namespace Models
{
    public class Cidades
    {
        public required int CdEstado { get; set; }
        public required int CdCidade { get; set; }
        public required string NmCidade { get; set; }
        public required int CdAgencia { get; set; }
        public required string NmAgencia { get; set; }
        public required int CdUnidade { get; set; }
        public required string NmUnidade { get; set; }
        public required int CdFormato { get; set; }
        public required string NmFormato { get; set; }
        public required int CdClassificacao { get; set; }
        public required string NmClassificacaoPt { get; set; }
        public required string NmClassificacaoEn { get; set; }
        public required string CdNmColuna { get; set; }
        public required string NmDescricaoPt { get; set; }
        public required string NmDescricaoEn { get; set; }
        public required string NmLabelPt { get; set; }
        public required string NmLabelEn { get; set; }
        public required string VlPorCd { get; set; }
    }
}