import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [botToken, setBotToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    if (!botToken.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите токен бота",
        variant: "destructive",
      });
      return;
    }
    setIsConnected(true);
    toast({
      title: "Успешно!",
      description: "Бот подключен и готов к работе",
    });
  };

  const commands = [
    {
      command: '/start',
      description: 'Приветственное сообщение и инструкции',
      icon: 'Sparkles',
    },
    {
      command: '/generate',
      description: 'Создать изображение из текстового описания',
      icon: 'ImagePlus',
    },
    {
      command: '/help',
      description: 'Показать справку по командам',
      icon: 'HelpCircle',
    },
  ];

  const stats = [
    { label: 'Сгенерировано', value: '0', icon: 'Image' },
    { label: 'Активных пользователей', value: '0', icon: 'Users' },
    { label: 'Среднее время', value: '~3с', icon: 'Clock' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Icon name="Bot" size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Telegram Image Bot
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Бот для генерации изображений через fal.ai с моделью nano banana
          </p>
        </div>

        {!isConnected ? (
          <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Link" size={20} />
                Подключение бота
              </CardTitle>
              <CardDescription>
                Введите токен вашего Telegram бота для начала работы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                  value={botToken}
                  onChange={(e) => setBotToken(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Получите токен у @BotFather в Telegram
                </p>
              </div>
              <Button 
                onClick={handleConnect} 
                className="w-full"
                size="lg"
              >
                <Icon name="Zap" size={18} className="mr-2" />
                Подключить бота
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium">Бот активен</span>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Icon name="CheckCircle2" size={14} />
                Подключено
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {stat.label}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon name={stat.icon} size={24} className="text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Terminal" size={20} />
                  Доступные команды
                </CardTitle>
                <CardDescription>
                  Команды, которые пользователи могут использовать в боте
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {commands.map((cmd) => (
                  <div
                    key={cmd.command}
                    className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={cmd.icon} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <code className="text-sm font-mono font-semibold">
                        {cmd.command}
                      </code>
                      <p className="text-sm text-muted-foreground mt-1">
                        {cmd.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Info" size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Как использовать бота</h3>
                    <ol className="text-sm text-muted-foreground space-y-2">
                      <li>1. Найдите вашего бота в Telegram</li>
                      <li>2. Отправьте команду /start для начала работы</li>
                      <li>3. Используйте /generate с описанием для создания изображения</li>
                      <li>4. Дождитесь генерации (обычно 2-5 секунд)</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
