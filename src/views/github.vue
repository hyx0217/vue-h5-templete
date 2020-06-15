<script>
import axios from "axios";
import { register } from "@/api/login.ts";
import { Toast } from "vant";

export default {
  methods: {
    githubAuth() {
      const data = {
        client_id: "132c598d286e32f9faea",
        client_secret: "4454ab611ff98ae9bbbb388c682b30cf9e795207",
        code: this.$route.query.code
      };
      axios.post("/githubAccessToken", data).then(res => {
        const access_token = res.data.split("&")[0].split("=")[1];
        axios
          .get(`/githubUserInfo`, { params: { access_token } })
          .then(async result => {
            let obj = {
              userName: result.data.email,
              password: 123456
            };
            try {
              //未注册
              await register(obj);
              await this.$store.dispatch("Login", obj);
              this.$router.replace("home");
            } catch (error) {
              //已注册直接登录
              await this.$store.dispatch("Login", obj);
              this.$router.replace("home");
            }
          })
          .catch(() => {
            Toast("token已过期");
          });
      });
    }
  },
  mounted() {
    this.githubAuth();
  }
};
</script>
