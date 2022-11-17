# Copyright (c) TIKI Inc.
# MIT license. See LICENSE file in root directory.

resource "digitalocean_app" "console-app" {
  spec {
    name   = "console"
    region = local.region

    domain {
      name = "console.mytiki.com"
      type = "PRIMARY"
    }

    static_site {
      name              = "console"
      build_command     = "npm ci; npm run build; npm run generate"
      output_dir        = "/dist"
      catchall_document = "404.html"

      github {
        repo           = "tiki/console"
        branch         = "main"
        deploy_on_push = true
      }
    }

    alert {
      rule = "DEPLOYMENT_FAILED"
    }

    alert {
      rule = "DOMAIN_FAILED"
    }
  }
}
