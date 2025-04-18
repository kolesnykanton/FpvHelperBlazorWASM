namespace FpvHelperBlazorWASM.Models
{
    public class PointForecastResponse
    {
        public long[] Ts { get; set; } = Array.Empty<long>();
        public double[] TempSurface { get; set; } = Array.Empty<double>();
        public double[] WindSpeed { get; set; } = Array.Empty<double>();
        public double[] WindDir { get; set; } = Array.Empty<double>();
        public double[] GustSurface { get; set; } = Array.Empty<double>();
        public double[] PrecipSurface { get; set; } = Array.Empty<double>();
    }

    public class PointForecastRequest
    {
        public double lat { get; set; }
        public double lon { get; set; }
        public string model { get; set; } = "gfs";
        public string[] parameters { get; set; } = Array.Empty<string>();
        public string[] levels { get; set; } = Array.Empty<string>();
        public string key { get; set; } = "";
    }

    public class GeoCoords
    {
        public double Lat { get; set; }
        public double Lon { get; set; }
    }
}
