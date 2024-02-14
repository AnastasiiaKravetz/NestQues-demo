from django.apps import AppConfig


class NestquestConfig(AppConfig):
    name = 'nestquest'
    
    def ready(self):
        import nestquest.signals

