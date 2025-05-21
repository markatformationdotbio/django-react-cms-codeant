import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import { Form, OverlayContext } from "@django-bridge/react";
import FormDef from "../../deserializers/Form";
import Layout from "../../components/Layout";
import { CSRFTokenContext, URLsContext } from "../../contexts";

interface MediaUploadViewProps {
  action_url: string;
  form: FormDef;
}

export default function MediaUploadView({
  action_url,
  form,
}: MediaUploadViewProps) {
  const { overlay, requestClose } = React.useContext(OverlayContext);
  const csrf_token = React.useContext(CSRFTokenContext);
  const urls = React.useContext(URLsContext);

  return (
    <Layout
      title="Download"
      breadcrumb={[{ label: "Media", href: urls.media_index }, { label: "" }]}
    >
      <input type="hidden" name="csrftoken" value={csrf_token} />
      <Form action={action_url} method="post">
        {form.render()}

        <Box display="flex" gap="12px" pt="20px">
          <Button>Upload</Button>
          {overlay && (
            <Button
              type="button"
              variant="outlined"
              onClick={() => requestClose({ skipDirtyFormCheck: true })}
            >
              Cancel
            </Button>
          )}
        </Box>
      </Form>
    </Layout>
  );
}
