resource "aws_s3_bucket" "ehr-repo-bucket" {
  bucket        = var.s3_bucket_name
  acl           = "private"
  force_destroy = true

  versioning {
    enabled = false
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    CreatedBy   = var.repo_name
    Environment = var.environment
  }
}

resource "aws_s3_bucket_policy" "ehr-repo-bucket_policy" {

  bucket = aws_s3_bucket.ehr-repo-bucket.id
  policy = jsonencode({
    "Statement": [
      {
        Effect: "Deny",
        Principal: "*",
        Action: "s3:*",
        Resource: "${aws_s3_bucket.ehr-repo-bucket.arn}/*",
        Condition: {
          Bool: {
            "aws:SecureTransport": "false"
          }
        }
      }
    ]
  })
}

