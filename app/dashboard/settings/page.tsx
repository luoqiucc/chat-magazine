import PageHeader from '@/components/page-header'
import SettingsFormWrapper from '@/components/wrapper/settings-form'

export default function Settings() {
    return (
        <>
            <PageHeader headerInfo={{
                title: '设置',
                summary: '管理应用设置'
            }} />

            <SettingsFormWrapper />
        </>
    )
}