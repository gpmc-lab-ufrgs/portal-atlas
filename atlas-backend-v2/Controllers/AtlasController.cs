using Models;
using Data;
using Microsoft.AspNetCore.Mvc;
using Data.Repositories;
namespace atlas_backend_v2.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AtlasController : ControllerBase
{
    private AtlasData dadosAtlas;
    public AtlasController()
    {
        dadosAtlas = new AtlasData();
    }

    [HttpGet]
    [Route("GetEstados")]
    public async Task<ActionResult<List<Estados>>> GetEstados()
    {
        List<Estados> lstEstados = await dadosAtlas.GetEstados();
        return Ok(lstEstados);
    }

    [HttpGet]
    [Route("GetCidade/{idCidade}")]
    public async Task<ActionResult<List<Cidades>>> GetCidade(int idCidade)
    {
        List<Cidades> lstCidade = await dadosAtlas.GetCidade(idCidade);
        return Ok(lstCidade);
    }
}