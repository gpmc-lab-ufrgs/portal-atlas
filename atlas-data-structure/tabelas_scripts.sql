CREATE USER atlas_adm WITH PASSWORD '123456';

creata

ALTER DATABASE atlas_db RENAME TO atlasdb;
ALTER USER atlas_adm WITH PASSWORD '123456';

ALTER USER atlas_adm WITH SUPERUSER;

create schema atlas_schema;

drop table if exists atlas_schema.tb_agencias;
drop table if exists atlas_schema.tb_unidades;
drop table if exists atlas_schema.tb_formato;
drop table if exists atlas_schema.tb_classificacao;
drop table if exists atlas_schema.tb_estados;
drop table if exists atlas_schema.tb_dicionario;
drop table if exists ;
drop table if exists ;
drop table if exists ;
drop table if exists ;
drop table if exists ;
drop table if exists ;
drop table if exists ;

create table atlas_schema.tb_agencias(
	cd_agencia serial,
	nm_agencia varchar(50) not null,
	constraint constraint_agencia unique (nm_agencia)
);

insert into atlas_schema.tb_agencias(nm_agencia) values ('IBGE');

select * from atlas_schema.tb_agencias;

create table atlas_schema.tb_unidades(
	cd_unidade serial,
	nm_unidade varchar(25) not null,
	constraint constraint_unidade unique (nm_unidade)
);

insert into atlas_schema.tb_unidades(nm_unidade) values ('Km²');
insert into atlas_schema.tb_unidades(nm_unidade) values ('R$');
insert into atlas_schema.tb_unidades(nm_unidade) values ('Número');
insert into atlas_schema.tb_unidades(nm_unidade) values ('Mil Unidades');
insert into atlas_schema.tb_unidades(nm_unidade) values ('Habitante/ Km²');
insert into atlas_schema.tb_unidades(nm_unidade) values ('Unidades');
insert into atlas_schema.tb_unidades(nm_unidade) values ('Pessoas');
insert into atlas_schema.tb_unidades(nm_unidade) values ('%');

select * from atlas_schema.tb_unidades;

create table atlas_schema.tb_formato(
	cd_formato serial,
	nm_formato varchar not null,
	constraint constraint_formato unique (nm_formato)
);

insert into atlas_schema.tb_formato(nm_formato) values ('Int');
insert into atlas_schema.tb_formato(nm_formato) values ('Float .2');
insert into atlas_schema.tb_formato(nm_formato) values ('Progress Bar');

select * from atlas_schema.tb_formato;

create table atlas_schema.tb_classificacao(
	cd_classificacao serial,
	nm_classificacao_pt varchar(50) not null,
	nm_classificacao_en varchar(50) not null,
	constraint constraint_class_pt unique (nm_classificacao_pt),
	constraint constraint_class_en unique (nm_classificacao_en)
);

insert into atlas_schema.tb_classificacao(nm_classificacao_pt, nm_classificacao_en) values ('Demográfica', 'Demographic');
insert into atlas_schema.tb_classificacao(nm_classificacao_pt, nm_classificacao_en) values ('Economia', 'Economy');
insert into atlas_schema.tb_classificacao(nm_classificacao_pt, nm_classificacao_en) values ('Tecnologia e Inovação', 'Technology and Inovation');
insert into atlas_schema.tb_classificacao(nm_classificacao_pt, nm_classificacao_en) values ('Empreendedorismo', 'Entrepreneurship');
insert into atlas_schema.tb_classificacao(nm_classificacao_pt, nm_classificacao_en) values ('Urbanismo', 'Urbanism');

select * from atlas_schema.tb_classificacao;

drop table atlas_schema.tb_estados;
create table atlas_schema.tb_estados(
	cd_estado int not null,
	nm_estado varchar(50) not null,
	constraint constraint_estado unique (nm_estado)
);
CREATE INDEX tb_estados_cd_estado_idx ON atlas_schema.tb_estados (cd_estado);

select * from atlas_schema.tb_estados;

create table atlas_schema.tb_dicionario(
	cd_nm_coluna varchar not null,
	cd_agencia int not null,
	cd_unidade int not null,
	cd_formato int not null,
	cd_classificacao int not null,
	nm_descricao_pt varchar not null,
	nm_descricao_en varchar not null,
	nm_label_pt varchar not null,
	nm_label_en varchar not null,
	constraint constraint_dict unique (cd_nm_coluna, cd_agencia, cd_unidade, cd_formato, cd_classificacao)	
);
CREATE INDEX tb_dicionario_idx ON atlas_schema.tb_dicionario (cd_nm_coluna, cd_agencia, cd_unidade, cd_formato, cd_classificacao);


drop table atlas_schema.tb_dicionario;

select * from atlas_schema.tb_estados;

select * from atlas_schema.tb_cod_valor_estado;

create table atlas_schema.tb_cod_valor_estado(
	cd_estado int not null,
	cd_nm_coluna varchar not null,
	vl_por_cd decimal not null,
	constraint constraint_cod_valor_estado unique (cd_estado, cd_nm_coluna)	
);
CREATE INDEX tb_cod_valor_estado_idx ON atlas_schema.tb_cod_valor_estado (cd_estado, cd_nm_coluna);

select 
	cve.cd_estado,
	e.nm_estado,
	cve.cd_nm_coluna,
	de.nm_descricao_pt,
	de.nm_label_pt,
	cve.vl_por_cd
from atlas_schema.tb_cod_valor_estado cve
left join atlas_schema.tb_estados e on cve.cd_estado  = e.cd_estado
left join atlas_schema.tb_dicionario de on cve.cd_nm_coluna = de.cd_nm_coluna 
where cve.cd_estado = 53;

create table atlas_schema.tb_cidades(
	cd_estado int not null,
	cd_cidade int not null,
	nm_cidade varchar(100) not null,
	constraint constraint_cidade unique (cd_estado, cd_cidade)
);
CREATE INDEX tb_cidades_idx ON atlas_schema.tb_cidades (cd_estado, cd_cidade);

select * from atlas_schema.tb_cidades;

drop table atlas_schema.tb_cod_valor_cidade;
create table atlas_schema.tb_cod_valor_cidade(
	cd_cidade int not null,
	cd_nm_coluna varchar not null,
	vl_por_cd varchar not null,
	constraint constraint_cod_valor_cidade unique (cd_cidade, cd_nm_coluna)	
);
CREATE INDEX tb_cod_valor_cidade_idx ON atlas_schema.tb_cod_valor_cidade (cd_cidade, cd_nm_coluna);

select count(*) from atlas_schema.tb_cod_valor_cidade;

SELECT schema_name, 
       sum(table_size),
       (sum(table_size) / database_size) * 100
FROM (
  SELECT pg_catalog.pg_namespace.nspname as schema_name,
         pg_relation_size(pg_catalog.pg_class.oid) as table_size,
         sum(pg_relation_size(pg_catalog.pg_class.oid)) over () as database_size
  FROM   pg_catalog.pg_class
     JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid
) t
GROUP BY schema_name, database_size;



select 
	*
from atlas_schema.tb_dicionario td;

select *
from atlas_schema.tb_classificacao tc;

select *
from atlas_schema.tb_cod_valor_estado tcve;

--cd_nm_coluna, cd_agencia, cd_unidade, cd_formato, cd_classificacao, nm_descricao_pt, nm_descricao_en, nm_label_pt, nm_label_en
select 
	te.cd_estado,
	te.nm_estado,
	tcve.cd_nm_coluna,
	td.cd_agencia,
	ta.nm_agencia,
	td.cd_unidade, 
	tu.nm_unidade,
	td.cd_formato, 
	tf.nm_formato,
	td.cd_classificacao, 
	tc.nm_classificacao_pt,
	tc.nm_classificacao_en,
	td.nm_descricao_pt, 
	td.nm_descricao_en, 
	td.nm_label_pt, 
	td.nm_label_en,
	tcve.vl_por_cd
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
	td.cd_classificacao;


'Demográfica',
  'Economia',
  'Empreendedorismo',
  'Educação',
  'Saúde',
  'Segurança',
  'Urbanismo',
  'Tecnologia e Inovação',
  'Meio Ambiente',
  'Mobilidade',

select 
	te.cd_estado,
	te.nm_estado,
	tcve.cd_nm_coluna,
	td.cd_agencia,
	ta.nm_agencia,
	td.cd_unidade, 
	tu.nm_unidade,
	td.cd_formato, 
	tf.nm_formato,
	td.cd_classificacao, 
	tc.nm_classificacao_pt,
	tc.nm_classificacao_en,
	td.nm_descricao_pt, 
	td.nm_descricao_en, 
	td.nm_label_pt, 
	td.nm_label_en,
	tcve.vl_por_cd
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
	td.cd_classificacao;

select * from atlas_schema.tb_formato tf;

select * from atlas_schema.tb_unidades tu ;

select * from atlas_schema.tb_classificacao tc 


select * from atlas_schema.tb_formato tf  ;



select 
    tcs.cd_estado,
    tcs.cd_cidade,
    tcs.nm_cidade,
    tcvc.cd_nm_coluna, 
    td.cd_agencia,
    ta.nm_agencia,
    td.cd_unidade,
    tu.nm_unidade,
    td.cd_formato,
    tf.nm_formato,
    td.cd_classificacao,
    tc.nm_classificacao_pt,
    tc.nm_classificacao_en,
    td.nm_descricao_pt,
    td.nm_descricao_en,
    td.nm_label_pt,
    td.nm_label_en,
    tcvc.vl_por_cd
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
and td.nm_label_en is not null
and td.nm_label_pt is not null
and td.cd_classificacao is not null
order by 
    tcs.cd_cidade,
    td.cd_classificacao



