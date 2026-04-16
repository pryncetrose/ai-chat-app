using System.Text;
using System.Text.Json;

public class AIService
{
    private readonly HttpClient _http;

    public AIService(HttpClient http)
    {
        _http = http;
    }

    public async Task<string> ChatAsync(string userMessage)
    {
        var payload = new
        {
            model = "llama3.2:1b",
            prompt = userMessage,
            stream = false
        };

        var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:11434/api/generate");
        request.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

        var response = await _http.SendAsync(request);
        var json = await response.Content.ReadAsStringAsync();

        Console.WriteLine("Ollama response: " + json);

        using var doc = JsonDocument.Parse(json);
        return doc.RootElement.GetProperty("response").GetString()!;
    }
}
