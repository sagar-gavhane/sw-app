import { notification, Button } from 'antd'

const key = 'update-available-notification'

const showUpdateAvailableNotification = registration => {
  notification.open({
    message: 'New version available',
    description:
      'There is a new version of the app ready. Please reload to update.',
    btn: (
      <Button
        type="primary"
        size="small"
        onClick={() => {
          console.log('Refresh button clicked')

          console.log('registration.waiting is', registration.waiting)

          if (registration.waiting) {
            console.log('again, post message SKIP_WAITING')
            registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          }

          setTimeout(() => {
            console.log('reload webpage after 1000 msec')
            window.location.reload()
          }, 1000)
        }}
      >
        Refresh
      </Button>
    ),
    key,
    onClose: () => notification.close(key),
    placement: 'bottomRight',
  })
}

export default showUpdateAvailableNotification
