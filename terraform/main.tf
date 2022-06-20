terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "eu-central-1"
}

variable "appsync_api_id" {
  type        = string
  description = "AppSync API id. API is created by Amplify."
}

variable "datasource_adapter_function_arn" {
  type        = string
  description = "Adapter lambda function ARN. Function is created by Amplify."
}

resource "aws_iam_role" "DsAdapterRole" {
  name = "DsAdapterRole"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "DsAdapterIAMPolicy" {
  name = "DsAdapterIAMPolicy"
  role = aws_iam_role.DsAdapterRole.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "lambda:InvokeFunction"
      ],
      "Effect": "Allow",
      "Resource": [
        "${var.datasource_adapter_function_arn}"
      ]
    }
  ]
}
EOF
}

resource "aws_appsync_datasource" "bboard_messages_datasource" {
  api_id           = var.appsync_api_id
  name             = "BBoardMessagesDataSource"
  type             = "AWS_LAMBDA"
  service_role_arn = aws_iam_role.DsAdapterRole.arn
  lambda_config {
    function_arn = var.datasource_adapter_function_arn
  }
}


