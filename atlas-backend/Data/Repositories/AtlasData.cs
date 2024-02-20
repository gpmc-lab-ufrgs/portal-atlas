using System.Data;
using Dapper;
using Models;
using Npgsql;

namespace Data.Repositories
{
    public class AtlasData
    {
        private readonly string connection = "Host=host.docker.internal;Port=5432;Database=atlasdb;Username=atlas_adm;Password=123456";
        //private readonly string connection = "Host=127.0.0.1;Port=5432;Database=atlasdb;Username=atlas_adm;Password=123456";//Environment.GetEnvironmentVariable("DefaultConnection")!;
        public async Task<List<Estados>> GetEstados()
        {
            try
            {
                string query = $@"
                    select 
                        te.cd_estado {nameof(Estados.CdEstado)},
                        te.nm_estado {nameof(Estados.NmEstado)},	
                        td.cd_agencia {nameof(Estados.CdAgencia)},
                        ta.nm_agencia {nameof(Estados.NmAgencia)},
                        td.cd_unidade {nameof(Estados.CdUnidade)}, 
                        tu.nm_unidade {nameof(Estados.NmUnidade)},
                        td.cd_formato {nameof(Estados.CdFormato)}, 
                        tf.nm_formato {nameof(Estados.NmFormato)},
                        td.cd_classificacao {nameof(Estados.CdClassificacao)}, 
                        tc.nm_classificacao_pt {nameof(Estados.NmClassificacaoPt)},
                        tc.nm_classificacao_en {nameof(Estados.NmClassificacaoEn)},
                        tcve.cd_nm_coluna {nameof(Estados.CdNmColuna)},
                        td.nm_descricao_pt {nameof(Estados.NmDescricaoPt)}, 
                        td.nm_descricao_en {nameof(Estados.NmDescricaoEn)}, 
                        td.nm_label_pt {nameof(Estados.NmLabelPt)}, 
                        td.nm_label_en {nameof(Estados.NmLabelEn)},
                        tcve.vl_por_cd {nameof(Estados.VlPorCd)}
                    from atlas_schema.tb_estados te
                    left join atlas_schema.tb_cod_valor_estado tcve on
                        te.cd_estado = tcve.cd_estado 
                    left join atlas_schema.tb_dicionario td on
                        tcve.cd_nm_coluna = td.cd_nm_coluna
                    left join atlas_schema.tb_agencias ta on
                        td.cd_agencia = ta.cd_agencia
                    left join atlas_schema.tb_unidades tu on
                        td.cd_unidade = tu.cd_unidade
                    left join atlas_schema.tb_formato tf on
                        td.cd_formato = tf.cd_formato 
                    left join atlas_schema.tb_classificacao tc on
                        td.cd_classificacao = tc.cd_classificacao
                    order by 
                        te.cd_estado,
                        td.cd_classificacao,
                        tcve.cd_nm_coluna;
                ";

                using NpgsqlConnection conn = new(connection);
                var lstEstados = await conn.QueryAsync<Estados>(query);
                await conn.CloseAsync();
                return lstEstados.ToList();

            }
            catch(Exception ex)
            {
                Console.WriteLine($"Fail GetEstados {ex}");
                throw;
            }
        }

        public async Task<List<Cidades>> GetCidade (int idCidade){
            try
            {
                string query = @$"
                    select 
                        tcs.cd_estado {nameof(Cidades.CdEstado)},
                        tcs.cd_cidade {nameof(Cidades.CdCidade)},
                        tcs.nm_cidade {nameof(Cidades.NmCidade)},
                        tcvc.cd_nm_coluna {nameof(Cidades.CdNmColuna)}, 
                        td.cd_agencia {nameof(Cidades.CdAgencia)},
                        ta.nm_agencia {nameof(Cidades.NmAgencia)},
                        td.cd_unidade {nameof(Cidades.CdUnidade)}, 
                        tu.nm_unidade {nameof(Cidades.NmUnidade)},
                        td.cd_formato {nameof(Cidades.CdFormato)}, 
                        tf.nm_formato {nameof(Cidades.NmFormato)},
                        td.cd_classificacao {nameof(Cidades.CdClassificacao)}, 
                        tc.nm_classificacao_pt {nameof(Cidades.NmClassificacaoPt)},
                        tc.nm_classificacao_en {nameof(Cidades.NmClassificacaoEn)},
                        td.nm_descricao_pt {nameof(Cidades.NmDescricaoPt)}, 
                        td.nm_descricao_en {nameof(Cidades.NmDescricaoEn)}, 
                        td.nm_label_pt {nameof(Cidades.NmLabelPt)}, 
                        td.nm_label_en {nameof(Cidades.NmLabelEn)},
                        tcvc.vl_por_cd {nameof(Cidades.VlPorCd)}
                    from atlas_schema.tb_cidades tcs
                    left join atlas_schema.tb_cod_valor_cidade tcvc on
                        tcs.cd_cidade = tcvc.cd_cidade
                    left join atlas_schema.tb_dicionario td on
                        tcvc.cd_nm_coluna = td.cd_nm_coluna
                    left join atlas_schema.tb_agencias ta on
                        td.cd_agencia = ta.cd_agencia
                    left join atlas_schema.tb_unidades tu on
                        td.cd_unidade = tu.cd_unidade
                    left join atlas_schema.tb_formato tf on
                        td.cd_formato = tf.cd_formato 
                    left join atlas_schema.tb_classificacao tc on
                        td.cd_classificacao = tc.cd_classificacao
                    where 
                        tcs.cd_cidade = {idCidade}
                    and td.nm_label_en is not null
                    and td.nm_label_pt is not null
                    and td.cd_classificacao is not null
                    order by 
                        tcs.cd_cidade,
                        td.cd_classificacao
                ";

                using NpgsqlConnection conn = new(connection);
                var lstEstados = await conn.QueryAsync<Cidades>(query);
                await conn.CloseAsync();
                return lstEstados.ToList();
            }
            catch(Exception ex)
            {
                Console.WriteLine($"Fail GetEstados {ex}");
                throw;
            }
        }
    }
}