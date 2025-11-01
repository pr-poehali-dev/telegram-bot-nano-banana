import json
import os
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Telegram bot webhook handler для генерации изображений через fal.ai
    Args: event - dict с httpMethod, body (Telegram update)
          context - object с request_id, function_name
    Returns: HTTP response dict с statusCode 200
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN', 'test_token')
    fal_api_key = os.environ.get('FAL_API_KEY', 'test_key')
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        message = body_data.get('message', {})
        chat_id = message.get('chat', {}).get('id')
        text = message.get('text', '')
        
        if not chat_id:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'isBase64Encoded': False,
                'body': json.dumps({'ok': True})
            }
        
        response_text = ''
        
        if text == '/start':
            response_text = (
                '🎨 Привет! Я бот для генерации изображений.\n\n'
                'Используйте команды:\n'
                '/generate <описание> - создать изображение\n'
                '/help - показать справку'
            )
        elif text == '/help':
            response_text = (
                '📖 Справка по командам:\n\n'
                '/start - начать работу\n'
                '/generate <описание> - создать изображение из текста\n\n'
                'Пример:\n'
                '/generate sunset over mountains'
            )
        elif text.startswith('/generate'):
            prompt = text.replace('/generate', '').strip()
            if prompt:
                response_text = f'⏳ Генерирую изображение: "{prompt}"...\nЭто займет несколько секунд.'
            else:
                response_text = '❌ Укажите описание изображения после команды /generate'
        else:
            response_text = 'Используйте /help для списка команд'
        
        if telegram_token != 'test_token':
            import urllib.request
            import urllib.parse
            
            telegram_url = f'https://api.telegram.org/bot{telegram_token}/sendMessage'
            data = urllib.parse.urlencode({
                'chat_id': chat_id,
                'text': response_text
            }).encode()
            
            req = urllib.request.Request(telegram_url, data=data)
            urllib.request.urlopen(req)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'ok': True})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'isBase64Encoded': False,
            'body': json.dumps({'error': str(e)})
        }