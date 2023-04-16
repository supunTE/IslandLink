import { Input, Textarea } from '@mantine/core'
import styles from './upload.module.scss'
import {
  Image,
  Video,
  Question,
  MapPin,
  Smiley,
  ChartBar
} from '@phosphor-icons/react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, FileInput } from '@mantine/core'

export default function Upload() {
  const [imageOpened, { open, close }] = useDisclosure(false)
  // const [questionOpened, { questionOpen, questionClose }] = useDisclosure(false)
  // const [locationOpened, { locationOpen, locationClose }] = useDisclosure(false)

  return (
    <div>
      <div className={styles.page_title}>Upload to Community</div>

      <div className={styles.details}>
        <Input placeholder="Title" radius="md" />
        <Textarea
          placeholder="Description"
          radius="md"
          withAsterisk
          minRows={12}
          className={styles.desc}
        />
      </div>

      <div className={styles.option_set}>
        <div className={styles.option} onClick={open}>
          <Image size={20} className={styles.icon_color} />
          <div>Image</div>
        </div>
        {/* <div className={styles.option}>
          <Video size={20} className={styles.icon_color} />
          <div>Video</div>
        </div> */}
        {/* <div className={styles.option} onClick={questionOpen}>
          <Question size={20} className={styles.icon_color} />
          <div>Question</div>
        </div>
        <div className={styles.option} onClick={locationOpen}>
          <MapPin size={20} className={styles.icon_color} />
          <div>Location</div>
        </div> */}
        {/* <div className={styles.option}>
          <Smiley size={20} className={styles.icon_color} />
          <div>Status</div>
        </div>
        <div className={styles.option}>
          <ChartBar size={20} className={styles.icon_color} />
          <div>Poll</div>
        </div> */}
      </div>

      <Modal
        opened={imageOpened}
        onClose={close}
        title="Upload Image"
        centered
        className={styles.popup_title}>
        {
          <div>
            <FileInput
              className={styles.input_file}
              label="Upload Image"
              placeholder="Upload Image"
              multiple
            />
          </div>
        }
      </Modal>
      {/* <Modal
        opened={questionOpened}
        onClose={questionClose}
        title="Authentication"
        centered>
      </Modal>
      <Modal
        opened={locationOpened}
        onClose={locationClose}
        title="Authentication"
        centered>
      </Modal> */}
    </div>
  )
}
