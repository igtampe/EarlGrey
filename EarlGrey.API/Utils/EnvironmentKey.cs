namespace EarlGrey.API.Utils {
    public class EnvironmentKey(string key) {

        string? Val = null;

        public override string ToString() {
            if (Val != null) { return Val; }
            Val = Environment.GetEnvironmentVariable(key);
            if (Val == null) {
                //OK uh..

                if (File.Exists(key + ".txt")) {
                    Val = File.ReadAllText(key + ".txt");
                    return Val;
                }

                File.WriteAllText(key + ".txt", "Here");
                throw new InvalidOperationException("Env file was missing");

            }

            return Val;
        }


    }
}
