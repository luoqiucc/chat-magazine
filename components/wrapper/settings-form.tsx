import settingsService from '@/lib/service/settings'
import SettingForm from '@/components/form/setting-form'

export default async function SettingsFormWrapper() {
    const settings = await settingsService.getAllSetting()

    return (
        <>
            {settings.map((item, index) => (
                <SettingForm
                    key={index}
                    uid={item.uid}
                    value={Number(item.value) === 0 ? false : true}
                    title={item.title}
                    description={item.description} />
            ))}
        </>
    )
}