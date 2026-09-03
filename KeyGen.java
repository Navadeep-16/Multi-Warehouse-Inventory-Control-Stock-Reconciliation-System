import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.util.Base64;
public class KeyGen {
    public static void main(String[] args) throws Exception {
        KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
        kpg.initialize(2048);
        KeyPair kp = kpg.generateKeyPair();
        System.out.println("PUB:" + Base64.getEncoder().encodeToString(kp.getPublic().getEncoded()));
        System.out.println("PRI:" + Base64.getEncoder().encodeToString(kp.getPrivate().getEncoded()));
    }
}
