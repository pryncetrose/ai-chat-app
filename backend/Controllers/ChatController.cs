using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly AIService _ai;
    public ChatController(AIService ai) => _ai = ai;

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest req)
    {
        var reply = await _ai.ChatAsync(req.Message);
        return Ok(new { reply });
    }
}
