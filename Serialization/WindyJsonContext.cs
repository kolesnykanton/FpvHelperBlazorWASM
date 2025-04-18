using System.Text.Json.Serialization;
using FpvHelperBlazorWASM.Models;

namespace FpvHelperBlazorWASM.Serialization
{
  [JsonSerializable(typeof(PointForecastRequest))]
  [JsonSerializable(typeof(PointForecastResponse))]
  internal partial class WindyJsonContext : JsonSerializerContext
  {
  }
}
