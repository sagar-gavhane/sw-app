import { notification, Button } from "antd";

const key = "update-available-notification";

const showUpdateAvailableNotification = (registration) => {
  notification.open({
    message: "New version available",
    description:
      "There is a new version of the app ready. Please reload to update.",
    btn: (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          if (registration.waiting) {
            registration.waiting.postMessage({ type: "SKIP_WAITING" });
          }

          window.location.reload();
        }}
      >
        Refresh
      </Button>
    ),
    key,
    onClose: () => notification.close(key),
    placement: "bottomRight",
  });
};

export default showUpdateAvailableNotification;
