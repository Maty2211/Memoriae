from rest_framework import serializers

class HeatmapDataSerializer(serializers.Serializer):
    """
    Serializer para los datos del heatmap.
    Usa DateTimeField y lo formatea como fecha para evitar errores.
    """
    fecha = serializers.DateTimeField(format="%Y-%m-%d")
    minutos_totales = serializers.IntegerField()

class EstadisticasSemanalesSerializer(serializers.Serializer):
    """Serializer para el resumen de estadísticas semanales."""
    minutos_semana_actual = serializers.IntegerField()
    minutos_semana_anterior = serializers.IntegerField()
    cambio_porcentual = serializers.FloatField()

class ResumenMensualSerializer(serializers.Serializer):
    """Serializer para el resumen de minutos de estudio por mes."""
    mes = serializers.CharField(max_length=10)
    minutos_totales = serializers.IntegerField()


class EstadisticasPerfilSerializer(serializers.Serializer):
    """
    Serializer principal que anida todas las estadísticas del perfil.
    """
    datos_heatmap = HeatmapDataSerializer(many=True)
    racha_de_dias = serializers.IntegerField()
    # Usamos un DictField para el estado de la meta, ya que las claves son strings ('0', '1', etc.)
    estado_meta_diaria = serializers.DictField(
        child=serializers.BooleanField()
    )
    estadisticas_semanales = EstadisticasSemanalesSerializer()
    resumen_mensual = ResumenMensualSerializer(many=True)