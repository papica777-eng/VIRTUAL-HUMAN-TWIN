from memory import InlineArray
from math import log

struct WakingCognitiveResonance:
    alias SCALE = 1000000
    alias TARGET_ALPHA_HZ = 8  # Идеалната Flow честота (8 Hz)
    
    var task_positive_power: Int64  # Мащабирана мощност на активната мрежа
    var dmn_entropy_noise: Int64    # Фонова ентропия (Default Mode Network)
    var coherence_score: Int64      # Фазова синхронизация на каналите (0.0 - 1.0)

    fn __init__(inout self, task_power: Float64, dmn_noise: Float64, coherence: Float64):
        self.task_positive_power = Int64(task_power * self.SCALE)
        self.dmn_entropy_noise = Int64(dmn_noise * self.SCALE)
        self.coherence_score = Int64(coherence * self.SCALE)

    fn calculate_controllable_percentage(self) -> Int64:
        """
        Изчислява точния процент (%) от общата мозъчна мощност,
        който операторът може активно да управлява в будно състояние.
        """
        let float_task = Float64(self.task_positive_power) / self.SCALE
        let float_dmn = Float64(self.dmn_entropy_noise) / self.SCALE
        let float_coherence = Float64(self.coherence_score) / self.SCALE

        # Ландауерова софтуерна регулация: Ентропията задушава фокусния капацитет
        let active_entropy = float_dmn / (float_coherence + 0.001)
        
        # Индекс на Канализирана Енергия (Channeled Energy Index)
        let total_energy_bound = float_task + float_dmn
        if total_energy_bound == 0: return 0
        
        let control_ratio = (float_task * float_coherence) / (total_energy_bound + active_entropy)
        
        // Превръщане в процент (0 - 100) мащабиран за SOUL
        return Int64(control_ratio * 100.0 * self.SCALE)
